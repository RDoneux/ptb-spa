## Set up

### Logging into Pulumi state backend

export AZURE_STORAGE_CONNECTION_STRING="<connection-string>"
pulumi login azblob://<container-name>?storage_account=<storage-account-name>

## Links:

[Details on deploying a static website on Azure using Pulumi](https://www.pulumi.com/blog/hosting-a-static-website-on-azure-with-pulumi/)
