# mysql-to-models

A database JSON schema generator form an existing mysql database.

## Description

This app generates a full schema of a database with tables, columns, constraints and relationships from an existing database.


## Installation

1. Install Node.JS v6 or greater.
4. Do `npm install -g mysqltomodels`.

## Usage

1. Create a config file with the database connection settings (see examples/example.json).
2. Do `npm start /path/to/my/settings.json` in a terminal inside this app folder. 
3. You will see the result schema in the stdout.

## License

Copyright 2016 Martín Molina Álvarez

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.