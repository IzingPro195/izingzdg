'use strict';
const _0x2f738e = _0x1853;
(function (_0x3c8c60, _0xcd349a) {
    const _0xb29c1a = _0x1853, _0xc36157 = _0x3c8c60();
    while (!![]) {
        try {
            const _0x5d3302 = -parseInt(_0xb29c1a(0x147)) / (0x21fe + -0xb21 + -0x16dc) + -parseInt(_0xb29c1a(0x134)) / (-0x4db + -0x1 * -0x26ef + -0x2212) + -parseInt(_0xb29c1a(0x156)) / (0x31 * -0x41 + -0x4d3 + -0x1 * -0x1147) + -parseInt(_0xb29c1a(0x146)) / (0x1 * -0xdb7 + 0x142f + 0x7 * -0xec) * (-parseInt(_0xb29c1a(0x150)) / (0xf1 * -0x29 + -0xd * -0x12f + -0x1 * -0x173b)) + parseInt(_0xb29c1a(0x14a)) / (-0x1f55 * -0x1 + 0x24a1 + -0x43f0) * (-parseInt(_0xb29c1a(0x140)) / (0x5c9 + 0xb * -0x197 + -0x7 * -0x1ad)) + -parseInt(_0xb29c1a(0x138)) / (0x20d2 + 0x11 * -0x65 + -0x1a15) * (-parseInt(_0xb29c1a(0x14b)) / (0x3f * 0x32 + -0x19b1 + 0xd6c)) + -parseInt(_0xb29c1a(0x133)) / (0x6cb + 0x1 * 0x1b95 + -0x2256) * (-parseInt(_0xb29c1a(0x158)) / (0x1281 + 0x17f6 + -0x2a6c * 0x1));
            if (_0x5d3302 === _0xcd349a)
                break;
            else
                _0xc36157['push'](_0xc36157['shift']());
        } catch (_0x3feed0) {
            _0xc36157['push'](_0xc36157['shift']());
        }
    }
}(_0x3265, 0x101306 + 0xaf13 * 0x13 + -0x137193));
const _0x1706d0 = {};
function _0x3265() {
    const _0x1a3931 = [
        'allowNull',
        '190148DbDJKE',
        'defineProp',
        'ctVZM',
        'xmJfF',
        'autoIncrem',
        'bpTUv',
        '4FXwixq',
        '75751oFkFIP',
        'Tenants',
        '__esModule',
        '84WDYdnr',
        '1850634NjEzDe',
        'dropTable',
        'exports',
        'DATE',
        'DataTypes',
        '448655bPYxHC',
        'CASCADE',
        'ent',
        'sequelize',
        'primaryKey',
        'kPLAM',
        '2637111rpKrAS',
        'lets',
        '4658269hGtMtJ',
        'Contacts',
        '60HBBMoW',
        '2152050hVVSuI',
        'type',
        'INTEGER',
        'Users',
        '16wkZmsw',
        'createTabl',
        'ContactWal',
        'RJenq',
        'value',
        'klWMx',
        'erty'
    ];
    _0x3265 = function () {
        return _0x1a3931;
    };
    return _0x3265();
}
function _0x1853(_0x29562e, _0x4a37e9) {
    const _0x45e904 = _0x3265();
    return _0x1853 = function (_0x2bd909, _0xcabe59) {
        _0x2bd909 = _0x2bd909 - (-0x4b * -0x4c + -0x60d * -0x1 + -0x1b1e);
        let _0x3f242f = _0x45e904[_0x2bd909];
        return _0x3f242f;
    }, _0x1853(_0x29562e, _0x4a37e9);
}
_0x1706d0[_0x2f738e(0x13c)] = !![], Object[_0x2f738e(0x141) + _0x2f738e(0x13e)](exports, _0x2f738e(0x149), _0x1706d0);
const sequelize_1 = require(_0x2f738e(0x153));
module[_0x2f738e(0x14d)] = {
    'up': _0x3f1584 => {
        const _0x53dbbc = _0x2f738e, _0x2dd132 = {};
        _0x2dd132[_0x53dbbc(0x142)] = _0x53dbbc(0x13a) + _0x53dbbc(0x157), _0x2dd132[_0x53dbbc(0x13d)] = _0x53dbbc(0x137), _0x2dd132[_0x53dbbc(0x13b)] = _0x53dbbc(0x151), _0x2dd132[_0x53dbbc(0x155)] = _0x53dbbc(0x159), _0x2dd132[_0x53dbbc(0x145)] = _0x53dbbc(0x148);
        const _0x20c0d1 = _0x2dd132, _0x297a02 = {};
        return _0x297a02[_0x53dbbc(0x135)] = sequelize_1[_0x53dbbc(0x14f)][_0x53dbbc(0x136)], _0x297a02[_0x53dbbc(0x144) + _0x53dbbc(0x152)] = !![], _0x297a02[_0x53dbbc(0x154)] = !![], _0x297a02[_0x53dbbc(0x13f)] = ![], _0x3f1584[_0x53dbbc(0x139) + 'e'](_0x20c0d1[_0x53dbbc(0x142)], {
            'id': _0x297a02,
            'walletId': {
                'type': sequelize_1[_0x53dbbc(0x14f)][_0x53dbbc(0x136)],
                'references': {
                    'model': _0x20c0d1[_0x53dbbc(0x13d)],
                    'key': 'id'
                },
                'onUpdate': _0x20c0d1[_0x53dbbc(0x13b)],
                'onDelete': _0x20c0d1[_0x53dbbc(0x13b)],
                'allowNull': ![]
            },
            'contactId': {
                'type': sequelize_1[_0x53dbbc(0x14f)][_0x53dbbc(0x136)],
                'references': {
                    'model': _0x20c0d1[_0x53dbbc(0x155)],
                    'key': 'id'
                },
                'onUpdate': _0x20c0d1[_0x53dbbc(0x13b)],
                'onDelete': _0x20c0d1[_0x53dbbc(0x13b)],
                'allowNull': ![]
            },
            'tenantId': {
                'type': sequelize_1[_0x53dbbc(0x14f)][_0x53dbbc(0x136)],
                'references': {
                    'model': _0x20c0d1[_0x53dbbc(0x145)],
                    'key': 'id'
                },
                'onUpdate': _0x20c0d1[_0x53dbbc(0x13b)],
                'onDelete': _0x20c0d1[_0x53dbbc(0x13b)],
                'allowNull': ![]
            },
            'createdAt': {
                'type': sequelize_1[_0x53dbbc(0x14f)][_0x53dbbc(0x14e)],
                'allowNull': ![]
            },
            'updatedAt': {
                'type': sequelize_1[_0x53dbbc(0x14f)][_0x53dbbc(0x14e)],
                'allowNull': ![]
            }
        });
    },
    'down': _0x36a067 => {
        const _0x456745 = _0x2f738e, _0x42c92c = {};
        _0x42c92c[_0x456745(0x143)] = _0x456745(0x13a) + _0x456745(0x157);
        const _0x1a2e1f = _0x42c92c;
        return _0x36a067[_0x456745(0x14c)](_0x1a2e1f[_0x456745(0x143)]);
    }
};