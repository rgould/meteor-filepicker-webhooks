Handle = {
  upload: function(data) {
    console.log("Got a file-upload notification!");
  },
  conversion: function(data) {
    console.log("Got a file conversion notification!");
  }
};

Router.map(function() {

  this.route('hooks/filepicker', {
    path: '/hooks/filepicker',
    where: 'server',
    action: function() {

      // Watch the Meteor log to see this output
      console.log("Hook called.");
      console.log("Headers: ", this.request.headers);
      console.log("Data: ", this.request.body);

      console.log("Action: ", this.request.body.action);

      if (this.request.body.action === "fp.upload") {
        Handle.upload(this.request.body);
      } else if (this.request.body.action === "fp.converse") {
        Handle.conversion(this.request.body);
      }

      this.response.writeHead(200, {'Content-Type': 'text/html'});
      //this.response.write("You wrote: " + this.request.body.message);
      this.response.write("\n");

      // `this.response.end` *must* be called, or else the connection is left open.
      this.response.end();

    }
  });

});
