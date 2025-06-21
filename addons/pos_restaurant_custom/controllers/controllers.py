# -*- coding: utf-8 -*-
# from odoo import http


# class PosRestaurantCustom(http.Controller):
#     @http.route('/pos_restaurant_custom/pos_restaurant_custom', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/pos_restaurant_custom/pos_restaurant_custom/objects', auth='public')
#     def list(self, **kw):
#         return http.request.render('pos_restaurant_custom.listing', {
#             'root': '/pos_restaurant_custom/pos_restaurant_custom',
#             'objects': http.request.env['pos_restaurant_custom.pos_restaurant_custom'].search([]),
#         })

#     @http.route('/pos_restaurant_custom/pos_restaurant_custom/objects/<model("pos_restaurant_custom.pos_restaurant_custom"):obj>', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('pos_restaurant_custom.object', {
#             'object': obj
#         })

