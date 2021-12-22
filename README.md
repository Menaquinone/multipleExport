<h1 align="center">multipleExport - script Photoshop</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
</p>

> Export the active document in JPG, PNg and/or GIF in the same time in Photoshop

## File extension

You can easily add another file extension in `multipleExport.type`.

You just need to know one thing :
The name used in your method is used for the extension of your file and the name of the checkbox.

```javascript
type: {
    jpg: function() {
      // Options for saving a document in your extension format.
      var jpgSaveOptions = new JPEGSaveOptions();

      jpgSaveOptions.embedColorProfile = true;
      jpgSaveOptions.FormatOptions = FormatOptions.OPTIMIZEDBASELINE;
      jpgSaveOptions.matte = MatteType.WHITE;
      jpgSaveOptions.quality = 12;

      // return it and that it !
      return jpgSaveOptions;
    }
}
```
