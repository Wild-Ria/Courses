$(function() {
    var Sticker = Backbone.Model,

    StickersCollection = Backbone.Collection.extend({
        model: Sticker
    }),

    StickerView = Backbone.View.extend({
        template: _.template($("#stickerTemplate").html()),
        className: "new-sticker",
        tagName: "div",
        events: {
            "click .delete":"deleteSticker"
        },

        deleteSticker: function() {
            this.remove();
            return false;
        },

        render: function() {
            this.$el.css({
                "left": this.model.get("coordsX"),
                "top":  this.model.get("coordsY"),
                "position": "absolute"
            });
            this.$el.draggable();
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    }),

    StickersCollectionView = Backbone.View.extend({

        initialize: function() {
            this.collection = new StickersCollection();
        },

        el: $("#sticker-board"),

        events: {
            "click":"render"
        },

        render: function(event) {
            var newSticker = new Sticker({
                "coordsX":event.pageX,
                "coordsY":event.pageY
            });
            this.addSticker(newSticker);
        },
        addSticker: function (model) {
            var stickerView = new StickerView({
                "model":model
            });
            this.$el.append(stickerView.render().el);
        }

    }),

    sticker = new StickersCollectionView();

});