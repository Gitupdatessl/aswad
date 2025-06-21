{
    'name': 'POS Custom Log',
    'version': '1.0',
    'category': 'Point of Sale',
    'depends': ['point_of_sale'],
    'data': [],
    'assets': {
        'point_of_sale.assets': [
            'pos_custom_log/static/src/js/log.js',
        ],
    },
    'installable': True,
    'application': False,
    'license': 'LGPL-3',
}
