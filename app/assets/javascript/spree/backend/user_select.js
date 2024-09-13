// This is heavily based off of the Spree.Views.Order.CustomerSelect view in Solidus

Spree.Views.Order.UserSelect = Backbone.View.extend({
  initialize(attrs) {
    this.placeholder = attrs.placeholder;
    this.render();
  },

  events: {
    'select2-selecting': 'onSelect',
  },

  onSelect(e) {
    const customer = e.choice;
    this.trigger('select', customer);
  },

  render() {
    const customerTemplate =
      // Imported by Solidus

      HandlebarsTemplates['orders/order_update_user/autocomplete'];

    const formatCustomerResult = (customer) => {
      return customerTemplate({
        customer,
      });
    };

    this.$el.select2({
      placeholder: this.placeholder,
      width: '400px',
      ajax: {
        url: Spree.pathFor('api/users'),
        params: { headers: { Authorization: `Bearer ${Spree.api_key}` } },
        datatype: 'json',
        data(term) {
          return {
            q: {
              m: 'or',
              email_start: term,
              name_start: term,
            },
          };
        },
        results(data) {
          return {
            results: data.users,
            more: data.current_page < data.pages,
          };
        },
      },
      formatResult: formatCustomerResult,
      formatSelection(customer) {
        // Imported by Solidus

        return Select2.util.escapeMarkup(customer.email);
      },
    });
  },
});
