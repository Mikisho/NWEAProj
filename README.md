# NWEAProj

Welcome to Weather Caching API.

# Technologies Used

* Nodejs
* Expressjs
* sqlite3
* puppet
* Vagrant

## Requirements to run in your local machine

For development, you will only need Node.js and a node global package, Yarn, installed in your environement.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on CentOs

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo dnf module list nodejs
      $ sudo dnf module enable nodejs:$version
      $ sudo dnf install nodejs

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v16.14.0

    $ npm --version
    8.5.0

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

---

## Install

    $ git clone https://github.com/Mikisho/NWEAProj.git
    $ cd NWEAProj
    $ npm install

## Running the project
   
   
    $ cd api
    $ node app.js

### Browsing the API from your local machine
    http://localhost:3000/temprature

---
## Building Vagrant

To use Vagrant, you need to have it installed on your system-- you can grab it from VagrantUp.com. Also, you will need a system to run the VM's-- while Vagrant runs with many providers, VirtualBox is free and easy to use.

Once you have those installed, copy the template you want to use. Now would be a good time to rename it to your project. Navigate to the directory `NWEAProj` in the terminal or command prompt and run the command vagrant up. Then sit back and watch the magic happen.
## Vagrant Commands Basics Cheatsheet
While it would not hurt to read up a little bit at the Vagrant Documentation Page, here are a few basic terminal commands to get you started:

* `vagrant up` -- Used to start up your vagrant box. If it is the first time you are starting this particular box, it will also provision it.
* `vagrant ssh` -- SSH into your Vagrant box and run commands on its internal terminal interface.
* `vagrant halt` -- Shut down your vagrant box-- it can be turned back on with `vagrant up` -- the box will not reprovision when being brought back up from a halted state.
* `vagrant provision` -- Used to re-run any provisioning scripts on the box.`
* `vagrant destroy` -- Shut down Vagrant box and remove it completely (the original box will remain on your system, and will not need to be re-downloaded should you decide you want to run vagrant up on the project again-- however, re-provisioning will occur.)

## Quick Resources
+ [Vagrant Documentation](https://www.vagrantup.com/)
+ [Vagrant - Getting Started](https://docs.vagrantup.com/v2/getting-started/index.html)
+ [Vagrant - Command Line Interface](https://docs.vagrantup.com/v2/cli/index.html)

## Puppet
## Documentation

Documentation for Puppet and related projects can be found online at the
[Puppet Docs site](https://puppet.com/docs).

