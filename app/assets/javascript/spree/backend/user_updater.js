// This is heavily based off of the Spree.Views.Order.CustomerDetails view in Solidus

Spree.Views.Order.UserUpdater = Backbone.View.extend({
  initialize(attrs) {
    this.orderNumber = attrs.orderNumber;
    this.orderUserEmail = attrs.orderUserEmail;
    this.orderId = attrs.orderId;
    this.userSelectView = new Spree.Views.Order.UserSelect({
      el: this.el,
      placeholder: this.orderUserEmail,
    });
    this.listenTo(this.userSelectView, 'select', this.onSelectUser);
  },

  onSelectUser(customer) {
    const confirmed = window.confirm(this.confirmMessage(customer));
    if (confirmed) {
      this.updateUser(customer)
        .then(() => {
          // Imported by Solidus

          show_flash(
            'success',
            `Updated the order's user to '${customer.email}'`,
          );

          window.location.reload();
        })
        .fail(() => {
          // Our version of jQuery promise are not compatible with the
          // native Promise. Once we upgrade to jQuery 3.0 we should use
          // .catch instead of .fail
          // https://jquery.com/upgrade-guide/3.0/#breaking-change-and-feature-jquery-deferred-is-now-promises-a-compatible
          // Imported by Solidus

          show_flash(
            'error',
            "Failed to update order's user. Please try again.",
          );
        });
    }
  },

  updateUser(customer) {
    return Spree.ajax({
      url: Spree.pathFor(`api/orders/${this.orderNumber}`),
      type: 'PUT',
      data: {
        id: this.orderNumber,
        override_email: false,
        order: {
          user_id: customer.id,
        },
      },
    }).promise();
  },

  confirmMessage(customer) {
    return `Are you sure you want to change the order's user to ${customer.email}?`;
  },
});
