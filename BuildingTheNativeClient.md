# Details #

The SDK can be downloaded [here](https://developers.google.com/native-client/sdk/download).

  * Download the SDK update utility and follow the instructions for building.
```
wget http://storage.googleapis.com/nativeclient-mirror/nacl/nacl_sdk/nacl_sdk.zip
unzip nacl_sdk.zip
cd nacl_sdk
./naclsdk update
```
  * This will start downloading updates e.g.
```
Downloading bundle pepper_28
(file 1/2 - "naclports.tar.bz2")
|================================================|
...
```
  * At the time of writing, pepper (the NaCl API, geddit?) was at version 28 and the compilers were located (relatively) in  pepper\_28/toolchain/linux\_x86\_newlib/bin. The following may change over time. Let us assume in the following that the compilers were installed here:
```
/some/path/nacl_sdk/pepper_28/toolchain/linux_x86_newlib/bin
```
  * From your Rosetta source checkout:
```
cd cmake/build_native_client
vi build_me.sh 
```
  * Change the export paths to the location above and adjust the compilers to match your App Engine architecture e.g. a Linux box with 4 cores available for compilation and using Ninja might use:
```
#!/bin/bash

export CC=/some/path/nacl_sdk/pepper_28/toolchain/linux_x86_newlib/bin/x86_64-nacl-gcc
export CXX=/some/path/nacl_sdk/pepper_28/toolchain/linux_x86_newlib/bin/x86_64-nacl-g++

cmake -G Ninja .
```
  * Change the CMakeLists file:
```
vi CMakeLists.txt
```
  * Change the following parameters as appropriate for your App Engine architecture: NACL\_SDK\_ROOT, NACL\_TOOLCHAIN\_DIR and CMAKE\_LINKER, CMAKE\_AR, CMAKE\_RANLIB, CMAKE\_STRIP

## libz problems? Manual compilation instructions ##

We hit some problems with zlib and had to build it manually.

More instructions to follow.
http://www.zlib.net/