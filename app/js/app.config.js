angular.module("docApp.Config", [])
.constant("config", {"WebStore":{"URL":"http://localhost:2222/","Resources":{"BlobStorage":{"Path":"storage/blob"},"CDNStorage":{"Path":"storage/cdn"}}}});
