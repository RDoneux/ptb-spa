import { AzureBlobFolder } from '@pulumi/synced-folder';
import { ResourceGroup } from '@pulumi/azure/core';
import { Account, AccountStaticWebsite } from '@pulumi/azure/storage';
import { Endpoint, Profile } from '@pulumi/azure/cdn';
import { Config, interpolate } from '@pulumi/pulumi';
import { join } from 'path';

const distPath = join(__dirname, '../dist/bundle');

const azureConfig = new Config('azure');
const config = new Config();

const prefix = config.require('prefix');
const fqdn = config.require('endpoint');
const location = azureConfig.require('location');

// https://www.pulumi.com/registry/packages/azure/api-docs/core/resourcegroup/
const resourceGroup: ResourceGroup = new ResourceGroup(
  `${prefix}-resource-group`,
  {
    location
  }
);

// https://www.pulumi.com/registry/packages/azure/api-docs/storage/account/
const storageAccount: Account = new Account(`${prefix}-storage`, {
  resourceGroupName: resourceGroup.name,
  accountReplicationType: 'LRS',
  accountTier: 'Standard',
  accountKind: 'StorageV2'
});

// https://www.pulumi.com/registry/packages/azure/api-docs/storage/accountstaticwebsite/
new AccountStaticWebsite(`${prefix}-static-website`, {
  storageAccountId: storageAccount.id,
  indexDocument: 'index.html',
  error404Document: 'index.html'
});

// https://www.pulumi.com/registry/packages/synced-folder/api-docs/azureblobfolder/
new AzureBlobFolder(`${prefix}-dist-files`, {
  path: distPath,
  resourceGroupName: resourceGroup.name,
  storageAccountName: storageAccount.name,
  containerName: '$web' // default container created by AccountStaticWebsite
});

// --- CDN --- //

const storageEndpoint = interpolate`${storageAccount.name}.z33.web.core.windows.net`;

// https://www.pulumi.com/registry/packages/azure/api-docs/cdn/profile/
const cdn: Profile = new Profile(`${prefix}-cdn`, {
  resourceGroupName: resourceGroup.name,
  location: 'global',
  sku: 'Standard_Microsoft'
});

// https://www.pulumi.com/registry/packages/azure/api-docs/cdn/endpoint/
const endpoint: Endpoint = new Endpoint(`${prefix}-endpoint`, {
  name: fqdn,
  resourceGroupName: resourceGroup.name,
  location: 'global',
  profileName: cdn.name,
  isHttpAllowed: false,
  isHttpsAllowed: true,
  originHostHeader: storageEndpoint,
  origins: [
    {
      name: `${prefix}-blob-storage`,
      hostName: storageEndpoint
    }
  ]
});

export const fqdnOutput = endpoint.fqdn;
