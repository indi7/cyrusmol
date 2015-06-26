# Introduction #

This installation assumes that you want to run a local version of the App Engine rather than use Mike's online version. You will need to download cyrusmol and the Google App Engine and then start the engine.

The instructions below should hopefully give you the following directory structure:
  * 

&lt;root&gt;


    * cyrusmol
    * google\_appengine

## cyrusmol setup ##

  * Get the current git address from [here](http://code.google.com/p/cyrusmol/source/checkout).
  * `git clone https://code.google.com/p/cyrusmol/`
  * Note: If your version of git cannot clone over https e.g. old versions on CentOS 5.x, you will need to update it.

## Google App Engine setup ##

  * Download Google App Engine for Python
    * Check [here](https://developers.google.com/appengine/downloads#Google_App_Engine_SDK_for_Python) to see what the latest version is - I use 1.8.1 below
```
wget http://googleappengine.googlecode.com/files/google_appengine_1.8.1.zip
unzip google_appengine_1.8.1.zip
```
    * All we need to do now is start the engine. Test it with the following:
```
cd google_appengine/
./dev_appserver.py --admin_host 127.0.0.1 --admin_port 8080  --host 127.0.0.1 --port 8000 ../cyrusmol/
```
    * I would recommend using a LAN IP address rather than 127.0.0.1 so that other people can check out the interface. The command above runs an instance of the engine with the user interface on port 8000 and the admin interface (can be used to inspect the database etc.) on port 8080.

## Slow GFX rendering in Chrome? ##

The frontend should be very responsive - you should be able to rotate, zoom, and select with the structure without much delay since this all runs client side. If the frontend is unresponsive, your browser may be using software rendering.

In my case, I had a weird problem where the frontend was working in Firefox but not Chrome. A constructor in the Three WebGL code was failing. To fix this:
  * Go to chrome://flags in the browser
  * Enable Override software rendering list
  * Restart the browser.