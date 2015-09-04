DataPackage Query
=================

Opens `datapackage.json` and contained `resource.csv` files and performs various search queries on the contents.

```
npm install datapackage-query
```

### Getting Started

Include package and perform a basic query with arguments. In this case the arguments are the type `key` and `search`

```
var Query = require('datapackage-query')

var arguments = { country: 'SY', 'search': 'DarkCo' }

Query.Grow('/path/to/your/datapackage.json', function(schema) {
  Query.Twirl('/path/to/datapackage/', schema.resources[0], arguments, function(csv_to_json_data) {
    // use your data for good :)
   })
})
```

### Arguments

**search** filters results by wild card search term specified

**key** filters results by "key" in a datapackage's schema to the specified value of query


### Examples

Here is an example of `datapackage-query` being used to power [digitalfreedom.io](https://digitalfreedom.io) website which creates a REST API using [ConjurorAPI](https://github.com/bnvk/ConjurorAPI) which exposes the data through the Hapi.js webserver.

Example: retrieve all surveillance vendors based in Germany:

```
curl "https://digitalfreedom.io/api/vendors?country=DE" | python -m json.tool
```

Example: retrieve all targeted attacks related to Syria that have employed the DarkComet RAT:

```
curl "https://digitalfreedom.io/api/targetedthreats?country=SY&family=DarkCo" | python -m json.tool
```

```
curl "https://digitalfreedom.io/api/vendors?country=DE&search=Trojan" | python -m json.tool
```


#### REST API Query Result

```
$ curl https://digitalfreedom.io/api/targetedthreats | python -m json.tool
{
    "description": "Targeted attacks related to civil society",
    "homepage": "",
    "license": "PDDL-1.0",
    "name": "data-targetedthreats",
    "repository": "https://github.com/digitalfreedom/data-targetedthreats.git",
    "result": [
        {
            "c2": "213.55.99.74",
            "country": "ET",
            "date": "2012-01-01",
            "family": "FinSpy",
            "md5": "8ae2febe04102450fdbc26a38037c82b",
            "reference": "https://citizenlab.org/2013/03/you-only-click-twice-finfishers-global-proliferation-2/",
            "target": "opposition"
        },
        {
            "c2": "46.4.69.25",
            "country": "ET",
            "date": "2013-12-01",
            "family": "RCS",
            "md5": "53a9e1b59ff37cc2aeff0391cc546201",
            "reference": "https://citizenlab.org/2014/02/hacking-team-targeting-ethiopian-journalists/",
            "target": "journalist"
        },
        ...
    ],
    "status": "success",
    "title": "Targeted Threats",
    "version": "0.1.0"
}
```
