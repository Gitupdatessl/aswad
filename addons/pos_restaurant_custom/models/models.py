# -*- coding: utf-8 -*-

# from odoo import models, fields, api


# class pos_restaurant_custom(models.Model):
#     _name = 'pos_restaurant_custom.pos_restaurant_custom'
#     _description = 'pos_restaurant_custom.pos_restaurant_custom'

#     name = fields.Char()
#     value = fields.Integer()
#     value2 = fields.Float(compute="_value_pc", store=True)
#     description = fields.Text()
#
#     @api.depends('value')
#     def _value_pc(self):
#         for record in self:
#             record.value2 = float(record.value) / 100

