(function() {
  new Vue({
    el: "#search_video",
    data: {
      keyword: "",
      error: false,
      message_error: "",
      loading: false,
      items: []
    },
    methods: {
      onSubmit: function() {
        if (null !== this.keyword) {
          this.error = false;
          this.loading = true;
          this.$http.get("images.php?key=" + this.keyword)
          .then(function(res) {
              return res.json();
            })
          .then(function(res) {
            // sucess
            if (res != '') {
              var items_array = [];
              res.map(function(item) {
                 items_array.push(item);
              });
              this.items = items_array;
            } else {
              this.items = [];
              this.error = true;
              this.message_error = "Not found images!";
            }
            this.loading = false;
          }, function(res) {
            // error
            this.error = true;
            this.message_error = "Load timeout!";
            this.loading = false;
          });
        } else {
          this.error = true;
          this.message_error = "Keyword null!";
          this.loading = false;
        }
      }
    }
  })
})();