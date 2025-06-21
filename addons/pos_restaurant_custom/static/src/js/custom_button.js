odoo.define('pos_table_waitress_assignment.inject', [
    'point_of_sale.ProductScreen',
    'owl.utils'
], function (ProductScreen, utils) {
    'use strict';
    const { patch } = utils;

    patch(ProductScreen.prototype, {
        render() {
            this._super();
            const div = document.createElement('div');
            div.innerHTML = "🚀 Hello from inject.js";
            div.style.background = '#0f0';
            div.style.padding = '10px';
            this.el.querySelector('.pos-rightheader')?.appendChild(div);
        },
    });
});
