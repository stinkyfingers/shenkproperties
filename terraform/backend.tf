terraform {
    backend "s3" {
      bucket = "remotebackend"
      key    = "shenkproperties/terraform.tfstate"
      region = "us-west-1"
      profile = "jds"
    }
  }
