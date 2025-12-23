function doPost(e) {
  try {
    // Log the incoming request for debugging
    Logger.log(JSON.stringify(e));

    // Accept JSON POST (application/json) or form-encoded POST (application/x-www-form-urlencoded)
    var email, timestamp, source;
    if (e && e.postData && e.postData.contents) {
      var contents = e.postData.contents;
      // Try parse JSON first, otherwise treat as URL-encoded form
      try {
        var data = JSON.parse(contents || '{}');
        Logger.log('Parsed JSON POST: ' + JSON.stringify(data));
        email = data.email;
        timestamp = data.timestamp;
        source = data.source;
      } catch (jsonErr) {
        Logger.log('Post body is not JSON, attempting form parse. Raw: ' + contents);
        // parse urlencoded form: key1=val1&key2=val2
        var obj = {};
        contents.split('&').forEach(function(pair) {
          if (!pair) return;
          var parts = pair.split('=');
          var key = decodeURIComponent(parts.shift().replace(/\+/g, ' '));
          var val = decodeURIComponent((parts.join('=') || '').replace(/\+/g, ' '));
          obj[key] = val;
        });
        Logger.log('Parsed form POST: ' + JSON.stringify(obj));
        email = obj.email || (e.parameter && e.parameter.email);
        timestamp = obj.timestamp || (e.parameter && e.parameter.timestamp);
        source = obj.source || (e.parameter && e.parameter.source);
      }
    } else {
      // No postData; fall back to e.parameter
      Logger.log('No postData; using e.parameter: ' + JSON.stringify(e.parameter));
      email = e.parameter && e.parameter.email;
      timestamp = e.parameter && e.parameter.timestamp;
      source = e.parameter && e.parameter.source;
    }

    // Example: Append data to Google Sheets (use sheet name 'Braving Grief')
    const ss = SpreadsheetApp.openById("AKfycbxFNgCAZBGWhCCeXRBcqTG5j6v5HWHJT55Ajj9fhm6USvpG-x1TG584R3j_VWTKbR-dgA");
    var sheet = ss.getSheetByName('Braving Grief');
    if (!sheet) {
      // Create the sheet if it doesn't exist and add headers
      sheet = ss.insertSheet('Braving Grief');
      sheet.appendRow(['Timestamp', 'Email', 'Source']);
    }
    sheet.appendRow([timestamp || new Date(), email, source || 'website']);

    // Return a success response
    return ContentService.createTextOutput(
      JSON.stringify({ status: "success", message: "Data saved successfully" })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    Logger.log(error.toString());
    return ContentService.createTextOutput(
      JSON.stringify({ status: "error", message: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  try {
    Logger.log(JSON.stringify(e));

    var email = e.parameter && e.parameter.email;
    var timestamp = (e.parameter && e.parameter.timestamp) || new Date().toISOString();
    var source = (e.parameter && e.parameter.source) || 'website';
    var callback = e.parameter && e.parameter.callback;

    var ss = SpreadsheetApp.openById("AKfycbxFNgCAZBGWhCCeXRBcqTG5j6v5HWHJT55Ajj9fhm6USvpG-x1TG584R3j_VWTKbR-dgA");
    var sheet = ss.getSheetByName('Braving Grief');
    if (!sheet) {
      sheet = ss.insertSheet('Braving Grief');
      sheet.appendRow(['Timestamp', 'Email', 'Source']);
    }
    // Use same column order as doPost: Timestamp, Email, Source
    sheet.appendRow([timestamp, email, source]);

    var payload = { status: 'success', message: 'Data saved successfully' };

    if (callback) {
      // Return JSONP so client can bypass CORS by loading as a script
      var js = callback + '(' + JSON.stringify(payload) + ');';
      return ContentService.createTextOutput(js).setMimeType(ContentService.MimeType.JAVASCRIPT);
    }

    return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    Logger.log(error.toString());
    var payload = { status: 'error', message: error.toString() };
    return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(ContentService.MimeType.JSON);
  }
}