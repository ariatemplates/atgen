*** Aria Templates Automatic Tool ***
The Aria Templates Automatic Tool is a tool that helps you build fast aria templates projects.


## Quick Start

git repo link

npm install atgen

## Features

* Cross platform because it runs inside the command line.
* It has two working modes: Wizard Mode & Single Command Mode.
* It generates the most significant folders' structure for an aria templates project.
* It generates the skeletons for all the files that you can create with aria templates.
* It check the composition of the files and folders names.


## Wizard Mode
If you run the tool in wizard mode, using the atgen command, the tool will create this structure:

structure:
        --- doc
        --- model
       --- lib
           |
             --- MyMacro.tml
       --- view
               |
               --- MyTemplate.tpl
               --- MyTemplateScript.js
        --- style
                |
                --- MyTemplateStyle.tpl.css
        --- MyController.js
        --- IMyController.js
        --- index.html
        --- README-AT.txt

Where:

- doc folder = it will be the folder where you will store the documentation of your project;
- model folder = it will be the folder where you will store your data model;
- lib folder = it will be the folder where you will store all your macro library files;
- view folder = it will be the folder where you will store all your templates and template scripts;
- style folder = it will be the folder where you will store all your css templates;

All the Controller, Interfaces and the bootstrap will be added to the root of your project.


### Contributing

Anyone and everyone is welcome to contribute


## Project information

* Source: link
* Web: link
* Docs: link
* Twitter: link


## License

### Major components:

* Express: https://github.com/visionmedia/express.git
* Optmist: https://github.com/substack/node-optimist.git
* Mkdirp: https://github.com/substack/node-mkdirp.git
* Colors: https://github.com/Marak/colors.js.git

### Everything else:

The Unlicense (aka: public domain)