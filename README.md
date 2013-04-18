# Aria Templates Automatic Tool
The Aria Templates Automatic Tool is a tool that helps you build fast aria templates projects.


## Quick Start

`npm install -g atgen`

## Features

* Cross platform (Node based.)
* Wizard Mode & Single Command Mode.
* Generates the most significant folders' structure for an aria templates project.
* Generates the skeletons for all the files that you can create with aria templates.
* Checks the composition of the files and folders names.


## Wizard Mode

If you run the tool in wizard mode, using the atgen command, the tool will create this structure:

structure:
<pre>
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
</pre>

- `doc`: project documentation;
- `model`: data model beans;
- `lib`: macro library files;
- `view`: all your templates and template scripts;
- `style`: all your css templates;

Controllers, Interfaces and the bootstrap will be added to the root of your project.


### Contributing

Anyone and everyone is welcome to contribute

### Major components:

* Express: https://github.com/visionmedia/express.git
* Optmist: https://github.com/substack/node-optimist.git
* Mkdirp: https://github.com/substack/node-mkdirp.git
* Colors: https://github.com/Marak/colors.js.git
