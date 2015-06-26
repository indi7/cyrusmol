# Introduction #

Initially, I was building the binary using the source/cmake/build\_release and source/cmake/build\_release\_static directories that cmake generates so some of the following information may not be necessary. The easiest way to build the backend is to use the source/cmake/build\_backend directory instead. However, if you want to create your own build configuration, this information may be useful.

## Install cmake ##

You probably will not have to do this step. I was building on CentOS 6.4 and since CentOS is always behind on releases, I needed to install an alternate version of cmake. Instructions can be found [here](http://www.cmake.org/cmake/resources/software.html). I used cmake 2.8.11.2.

## Install ninja ##

I needed to install ninja on our server. There are [instructions here](http://martine.github.io/ninja/) on how to do that. You do not need to use ninja but trying to figure out how to build using SCons would probably be painful.

## Pilot apps settings ##

I am unsure whether this step was necessary in the end. It depends on how cmake generates the build files. In either case, the following would probably be necessary for a SCons build.
  * Assuming you are in the root directory of the Rosetta source checkout, edit the pilot apps settings:
```
vi src/pilot_apps.src.settings.all
```
  * Search for the "pilot/mike" section and add:
```
 "rosetta_backend",
```

## Create the build files ##

Again, assuming you are in the root directory of the Rosetta source checkout:
```
cd cmake
./make_project.py all
cd build_backend
cmake -G Ninja .
```

This creates rules.ninja, build.ninja etc. in the cmake/build\_backend directory.

Note: If you get the following error:
CMake Error: Could not create named generator Ninja

Update your cmake to the latest version. (>2.8.10)

## Add cURL dependencies ##

This step may not be necessary for the build\_backend configuration. If you find that it is/is not, please edit the following.

### Compiler ###

```
vi rules.ninja
```
Add -DWITHCURL to the compiler settings i.e.
```
rule CXX_COMPILER
  depfile = $DEP_FILE
  command = /usr/bin/c++   $DEFINES $FLAGS -MMD -MT $out -MF "$DEP_FILE" -o $out -c $in -DWITHCURL
  description = Building CXX object $out
```

### Linker ###

This step does not seem necessary for the build\_backend configuration.

```
vi build.ninja
```
  * Search for 'Link the executable rosetta\_backend'
  * Add '-lcurl' (adding it at the end should work) to the LINK\_LIBRARIES line if it does not already exist somewhere in the line.

## Building the backend ##

To build with ninja using 7 cores:
```
ninja -j 7 rosetta_backend
ninja -j 7 rosetta_backend_symlink
```

## Problems building static builds? ##

You do not need to do this for the build\_backend configuration but it may be helpful if you want to use a different configuration.

Edit CMakeLists.txt in the cmake/build\_release\_static directory and add rosetta\_backend explicitly i.e.
```
SET(BINARIES
    ../../src/apps/pilot/someuser/someapp
    ../../src/apps/pilot/someotheruser/someotherapp
    ../../src/apps/pilot/mike/rosetta_backend.cc
```