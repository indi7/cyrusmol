# Introduction #

(Mike is the best person to write this but I will add some notes)

Ideas
  * mention high scalability of App Engine etc.
  * mention the GoogleAppEngineLauncher (Mac only?)
  * talk about workflows and child jobs e.g. run a job, get the results, click on a model in the results, run a job on that model which creates a child job.
  * talk about donated resources, failure recovery
  * add diagrams of possible network configurations

## Infrastructure ##

The [components diagram](ComponentsDiagram.md) describes how the different components of cyrusmol interact.

## Native client ##

The cyrusmol browser client runs the Google App Engine and supports running a [native client / NaCl](https://developers.google.com/native-client/) in the user's Chrome browser. A native client is an application that runs natively on the user's hardware (x86 32-/64-bit binaries) but is built with a compiler which [removes/restricts certain operations](https://developers.google.com/native-client/overview#limitations) for security e.g. network sockets, threads creation.

Essentially, the browser client will have a sandboxed version of Rosetta which runs locally and with which the client can communicate. The advantages are obvious: need an RMSD calculation, use the native client. Need to quickly find the nearest set of neighboring atoms? Use the native client. There is no need to reinvent the wheel by rewriting Rosetta functionality in Javascript or client-server AJAX requests which would (should) be slower than native calls.

A native client could also check a PDB for Rosetta compatibility e.g. warn about residues which would be ignored (selenomethionine and selenocysteine?), missing occupancies, syntax errors etc. and let the user know before a job is started.

The App Engine client browser has a NACLS-Status informing the user on whether the native client is available. For example, check out the [live app](http://minirosetta.appspot.com/).

The native client can request files e.g. rama tables, from the App Engine however some small files e.g. weights files, are statically compiled into the native binary to avoid the overhead of requesting them from the engine.

## Database ##

The App Engine uses a database (datastore) to store data (e.g. user data, job parameters, results). You can interact with the database using an [abstracted interface layer](https://developers.google.com/appengine/docs/python/gettingstartedpython27/usingdatastore) (think SQLAlchemy rather than MySQL). At present, cyrusmol stores some Rosetta score terms  associated with active/completed jobs in the database. These can be used in a query to generated graphs or as filter criteria for viewing results.

There is a lot of potential for data-rich applications using the datastore. For example, the Rosetta features database already stores a lot of useful information which could be imported into the datastore.