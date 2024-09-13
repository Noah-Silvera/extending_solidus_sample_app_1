// Based off of from gems/solidus-*/backend/app/assets/javascripts/spree/backend/checkouts/edit.js

Spree.ready(function() {
  new Spree.Views.Order.UserUpdater({
    el: $('#order_user_update'),
    orderNumber: $('#order_user_update').data('order-number'),
    orderUserEmail: $('#order_user_update').data('order-user-email'),
    orderId: $('#order_user_update').data('order-id')
  });
});
