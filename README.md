# Pyntax - Data Framework

This library helps abstracting the CRUD operations on aa Api resource. 

## Installation
```bash
npm install pyntax-data-framework --save
```

## Setup

### .env variables
```dotenv
APPLICATION_NAME: 'APPLICATION_NAME'
BASE_URL: 'BASE_URL'
API_URL: 'BASE_API_URI'
UNAUTHENTICATED_REDIRECT_ROUTE: 'UNAUTHENTICATED_REDIRECT_ROUTE'
```

### Code setup

1. Import the make function from the library, it's the factory function.
```javascript
import {make} from 'pyntax-data-framework/lib/data/ResourceManagerFactory';
import ResourceUrls from 'pyntax-data-framework/lib/data/ResourceUrls';

const ContactApi = make(new ResourceUrls("contact"));
```

### Using to call the resource.

## Create in CRUD
```javascript
ContactApi.create({first_name: "Sahil", last_name: "Sharma"}).then((res) => {
    console.log(res);
}).catch((err) => {
    console.error(err);
})
```

### Update in CRUD
```javascript
ContactApi.update(id,{first_name: "Sahil", last_name: "Sharma"}).then((res) => {
  console.log(res);
}).catch((err) => {
  console.error(err);
});
```

### Delete in CRUD
```javascript
ContactApi.update(id,{first_name: "Sahil", last_name: "Sharma"}).then((res) => {
  console.log(res);
}).catch((err) => {
  console.error(err);
});
```

### Get by Id in CRUD
```javascript
ContactApi.getById(id).then((res) => {
  console.log(res);
}).catch((err) => {
  console.error(err);
});
```

### Find all in CRUD
```javascript
ContactApi.findAll(pageSize, pageNumber, additionalParameters).then((res) => {
  console.log(res);
}).catch((err) => {
  console.error(err);
});
```