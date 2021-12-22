const multipleExport = {
  version: function() {
    console.log('v:1.2.0');
  },
  doc: app.activeDocument,
  docName: app.activeDocument.name,

  init: function() {
    this.dialog();
  },
  // ? Open the dialog :
  // * Choose the location
  // * Whrite the name (by default the name of the active document)
  // * Check if only one box is checked (mandatory)
  // * Export !
  dialog: function() {

    var path = Folder.selectDialog('Choose a Save Location');

    if (path !== null) {

      var dialogBox = new Window('dialog', 'Save As:', undefined, {
        resizeable: true
      });

      dialogBox.orientation = 'column';
      dialogBox.alignChildren = 'row';

      // TEXT ZONE
      var label = dialogBox.add('statictext');
      label.text = 'Filename: ';

      var textArea = dialogBox.add('editText');
      textArea.text = this.docName.substr(0, this.docName.length - 4);
      textArea.alignment = ['fill', ''];
      textArea.minimumSize.width = 250;
      textArea.preferredSize.height = 23;

      // BOX ZONE
      var groupeCheckBox = dialogBox.add('group');
      var checkBox = {}

      // * Count the number of this.type and automatically add the correct number of checkboxes
      for (var property in this.type) {
        checkBox[property] = groupeCheckBox.add('checkbox {text:"' + property.toUpperCase() + '"}')
      }

      // BTN ZONE
      var groupedBtn = dialogBox.add('group');
      groupedBtn.add('button {text: "Cancel"}');
      var buttonSave = groupedBtn.add('button {text: "Export"}');

      // ! Resizing only the dialog width
      dialogBox.onResizing = dialogBox.onResize = function() {
        this.layout.resize();
      }

      dialogBox.onShow = function() {
        dialogBox.minimumSize = dialogBox.size;
      }

      var that = this;
      buttonSave.onClick = function() {
        var newDocName = textArea.text
        var tabCheckBox = [];

        for (var property in checkBox) {
          if (checkBox[property].value === true) tabCheckBox.push(property);
        }

        that.save(path, newDocName, tabCheckBox);
        if (tabCheckBox.length !== 0) dialogBox.close()
      };

      dialogBox.show();
    }

  },
  // ? Save only when the checkbox are checked
  save: function(path, name, tab) {

    var file = new File(path + '/' + name);

    if (tab.length !== 0) {
      for (var i = 0; i < tab.length; i++) {
        var exportOpt = this.type[tab[i]]();
        this.doc.saveAs(file, exportOpt, true, Extension.LOWERCASE);
        if (i + 1 === tab.length) {
          var textBox = new Window('dialog', 'Export');
          textBox.preferredSize.width = 100;
          var label = textBox.add('statictext');
          textBox.add('button {text: "Ok"}');
          label.text = 'Done';
          textBox.show();
        }
      }
    } else {
      alert('Choose an extension');
    }

  },
  // ? Add different type if you want, return the save options
  type: {
    jpg: function() {
      var jpgSaveOptions = new JPEGSaveOptions();

      jpgSaveOptions.embedColorProfile = true;
      jpgSaveOptions.FormatOptions = FormatOptions.OPTIMIZEDBASELINE;
      jpgSaveOptions.matte = MatteType.WHITE;
      jpgSaveOptions.quality = 12;

      return jpgSaveOptions;
    },
    png: function() {
      var pngSaveOptions = new PNGSaveOptions();

      pngSaveOptions.compression = 9;
      pngSaveOptions.interlaced = false;

      return pngSaveOptions;
    },
    gif: function() {
      var gifSaveOptions = new GIFSaveOptions();

      gifSaveOptions.colors = 256;
      gifSaveOptions.dither = Dither.PATTERN;
      gifSaveOptions.matte = MatteType.WHITE;
      gifSaveOptions.forced = ForcedColors.NONE;
      gifSaveOptions.palette = Palette.LOCALSELECTIVE;
      gifSaveOptions.transparency = true;
      gifSaveOptions.interlaced = false;

      return gifSaveOptions;
    }
  }
};

multipleExport.init();
