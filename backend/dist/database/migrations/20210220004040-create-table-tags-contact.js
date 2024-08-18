'use strict';
function _0x2e44() {
    const _0x401ed1 = [
        'Tenants',
        'dropTable',
        'JWvbg',
        '2219819eBVjnE',
        'CASCADE',
        '3941216yReqBO',
        'Mtiuh',
        'value',
        '495336AOjbIB',
        '__esModule',
        'ContactTag',
        '18IywkBA',
        'INTEGER',
        'rJrDD',
        'DataTypes',
        'GknXU',
        'exports',
        'EGgqx',
        '16abZEzb',
        'tuVYl',
        '675378moDDkI',
        'autoIncrem',
        'sequelize',
        'DATE',
        'ent',
        'allowNull',
        'EXmGv',
        'Tags',
        '594981pIWPzP',
        '2140385IcKLrm',
        '80TjSuqK',
        'type',
        'Contacts',
        '3NPXOli',
        'createTabl',
        'primaryKey',
        '304082cLhPrn',
        'defineProp',
        'RESTRICT',
        'erty'
    ];
    _0x2e44 = function () {
        return _0x401ed1;
    };
    return _0x2e44();
}
const _0x5f0c00 = _0x9979;
(function (_0x1e750c, _0x3ba688) {
    const _0xb14d81 = _0x9979, _0x1c0f91 = _0x1e750c();
    while (!![]) {
        try {
            const _0x5cf028 = parseInt(_0xb14d81(0x97)) / (-0x1 * 0x1085 + -0x129e + 0x2324 * 0x1) * (-parseInt(_0xb14d81(0x9a)) / (-0x2 * -0x78e + -0x1 * -0x1780 + -0x269a)) + parseInt(_0xb14d81(0xa6)) / (0x95c + -0x650 + -0x309) + -parseInt(_0xb14d81(0xa3)) / (-0x274 + 0x1c1 * 0x6 + -0x80e) + parseInt(_0xb14d81(0x93)) / (-0x22ac + 0x1f0c + 0x3a5) * (parseInt(_0xb14d81(0xa9)) / (-0x1df * -0x5 + -0x1cee + 0x1399)) + parseInt(_0xb14d81(0xa1)) / (0x1211 + 0x565 * -0x1 + 0x27 * -0x53) + -parseInt(_0xb14d81(0xb0)) / (0xb * -0x31c + 0x4f2 * -0x4 + 0x3604) * (parseInt(_0xb14d81(0x92)) / (-0x10b3 + 0x525 * 0x6 + -0xe22)) + -parseInt(_0xb14d81(0x94)) / (0x1645 * -0x1 + 0x16 * 0x3a + 0x1153) * (-parseInt(_0xb14d81(0xb2)) / (-0xc50 + 0x1 * 0x2c8 + 0x993));
            if (_0x5cf028 === _0x3ba688)
                break;
            else
                _0x1c0f91['push'](_0x1c0f91['shift']());
        } catch (_0xf603f6) {
            _0x1c0f91['push'](_0x1c0f91['shift']());
        }
    }
}(_0x2e44, -0x51 * -0x16e2 + -0x45752 + 0x789af));
function _0x9979(_0xe37e0, _0x20e468) {
    const _0x9fe22 = _0x2e44();
    return _0x9979 = function (_0x4125d5, _0x53dc00) {
        _0x4125d5 = _0x4125d5 - (-0x1fea + -0x101a + -0x1f * -0x191);
        let _0x30515b = _0x9fe22[_0x4125d5];
        return _0x30515b;
    }, _0x9979(_0xe37e0, _0x20e468);
}
const _0x194e7f = {};
_0x194e7f[_0x5f0c00(0xa5)] = !![], Object[_0x5f0c00(0x9b) + _0x5f0c00(0x9d)](exports, _0x5f0c00(0xa7), _0x194e7f);
const sequelize_1 = require(_0x5f0c00(0x8c));
module[_0x5f0c00(0xae)] = {
    'up': _0x528eb5 => {
        const _0x44f236 = _0x5f0c00, _0x41463d = {};
        _0x41463d[_0x44f236(0xb1)] = _0x44f236(0xa8) + 's', _0x41463d[_0x44f236(0xa0)] = _0x44f236(0x91), _0x41463d[_0x44f236(0xab)] = _0x44f236(0xa2), _0x41463d[_0x44f236(0x90)] = _0x44f236(0x9c), _0x41463d[_0x44f236(0xaf)] = _0x44f236(0x96), _0x41463d[_0x44f236(0xa4)] = _0x44f236(0x9e);
        const _0x1ed475 = _0x41463d, _0x527ca1 = {};
        return _0x527ca1[_0x44f236(0x95)] = sequelize_1[_0x44f236(0xac)][_0x44f236(0xaa)], _0x527ca1[_0x44f236(0x8b) + _0x44f236(0x8e)] = !![], _0x527ca1[_0x44f236(0x99)] = !![], _0x527ca1[_0x44f236(0x8f)] = ![], _0x528eb5[_0x44f236(0x98) + 'e'](_0x1ed475[_0x44f236(0xb1)], {
            'id': _0x527ca1,
            'tagId': {
                'type': sequelize_1[_0x44f236(0xac)][_0x44f236(0xaa)],
                'references': {
                    'model': _0x1ed475[_0x44f236(0xa0)],
                    'key': 'id'
                },
                'onUpdate': _0x1ed475[_0x44f236(0xab)],
                'onDelete': _0x1ed475[_0x44f236(0x90)],
                'allowNull': ![]
            },
            'contactId': {
                'type': sequelize_1[_0x44f236(0xac)][_0x44f236(0xaa)],
                'references': {
                    'model': _0x1ed475[_0x44f236(0xaf)],
                    'key': 'id'
                },
                'onUpdate': _0x1ed475[_0x44f236(0xab)],
                'onDelete': _0x1ed475[_0x44f236(0xab)],
                'allowNull': ![]
            },
            'tenantId': {
                'type': sequelize_1[_0x44f236(0xac)][_0x44f236(0xaa)],
                'references': {
                    'model': _0x1ed475[_0x44f236(0xa4)],
                    'key': 'id'
                },
                'onUpdate': _0x1ed475[_0x44f236(0xab)],
                'onDelete': _0x1ed475[_0x44f236(0xab)],
                'allowNull': ![]
            },
            'createdAt': {
                'type': sequelize_1[_0x44f236(0xac)][_0x44f236(0x8d)],
                'allowNull': ![]
            },
            'updatedAt': {
                'type': sequelize_1[_0x44f236(0xac)][_0x44f236(0x8d)],
                'allowNull': ![]
            }
        });
    },
    'down': _0x400874 => {
        const _0x4df0e8 = _0x5f0c00, _0x4ac264 = {};
        _0x4ac264[_0x4df0e8(0xad)] = _0x4df0e8(0xa8) + 's';
        const _0x2f14c5 = _0x4ac264;
        return _0x400874[_0x4df0e8(0x9f)](_0x2f14c5[_0x4df0e8(0xad)]);
    }
};