variable "profile" {
  type = string
  default = "jds"
}

variable "region" {
  type = string
  default = "us-west-1"
}

variable "project" {
  type = string
  default = "shenkproperties"
}

variable "domain" {
  type = string
  default = "shenkproperties.com"
}

variable "zone_id" {
  type = string
  default = "Z07576987ZXVIW0QWR8M"
}

variable "certificate_arn" {
  type = string
  default = "arn:aws:acm:us-east-1:671958020402:certificate/7f0419b8-2b21-4642-bf91-c6904c16935a"
}
