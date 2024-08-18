'use strict';
function _0x1c5f() {
    const _0x2e791e = [
        'all',
        'LKHAH',
        'SET\x20NULL',
        'exports',
        '6Rncjip',
        'Tenants',
        'erty',
        'TEXT',
        'BxHfd',
        'rztSu',
        'INTEGER',
        '595016loZYPL',
        '15413ckZHnQ',
        '2754615ECdcIh',
        'WJvfG',
        '_uuid()',
        'dropTable',
        'Whatsapps',
        'createTabl',
        'sequelize',
        '588yWuFcy',
        'DataTypes',
        'literal',
        'value',
        'STRING',
        'DATE',
        '7290063KhVrQW',
        'gen_random',
        'CASCADE',
        'ljqjU',
        'KIunQ',
        '15vFVtSO',
        'isUrl',
        '__esModule',
        'ApiConfigs',
        '23751GVqvSC',
        'BOOLEAN',
        'UUID',
        '1014870FXIeIJ',
        '8WdTxbq',
        'defineProp',
        'Sequelize',
        'qCnSK',
        'Users',
        'kSKfG',
        '21270898rcOkbE'
    ];
    _0x1c5f = function () {
        return _0x2e791e;
    };
    return _0x1c5f();
}
const _0x1f7adc = _0x2169;
(function (_0x139694, _0x5e66c8) {
    const _0x390014 = _0x2169, _0x5dc308 = _0x139694();
    while (!![]) {
        try {
            const _0x5d32ac = parseInt(_0x390014(0xf7)) / (-0xaa1 * 0x3 + 0xa9a * -0x2 + 0x1a8c * 0x2) * (-parseInt(_0x390014(0xef)) / (0x907 + -0x188 * -0x16 + 0x349 * -0xd)) + parseInt(_0x390014(0xdc)) / (0x15f * 0xa + -0x21e + 0x1 * -0xb95) * (-parseInt(_0x390014(0xf6)) / (0x139b * 0x1 + 0x2502 + -0x3899)) + parseInt(_0x390014(0xf8)) / (0xab + 0xb * 0x51 + 0x1 * -0x421) + parseInt(_0x390014(0xff)) / (-0x137 + 0x24d5 + -0x88 * 0x43) * (-parseInt(_0x390014(0xe0)) / (-0x7 * 0x446 + 0x190b + 0x4e6)) + parseInt(_0x390014(0xe4)) / (-0x1d * -0x2b + 0xdc9 + -0x12a0) * (-parseInt(_0x390014(0x105)) / (-0xec8 + 0xe * -0xe9 + 0x1b8f)) + -parseInt(_0x390014(0xe3)) / (-0xfcf + 0xd21 * -0x1 + 0x1cfa) + parseInt(_0x390014(0xea)) / (0x3 * -0x233 + 0x1f * -0x83 + -0x1 * -0x1681);
            if (_0x5d32ac === _0x5e66c8)
                break;
            else
                _0x5dc308['push'](_0x5dc308['shift']());
        } catch (_0x7160da) {
            _0x5dc308['push'](_0x5dc308['shift']());
        }
    }
}(_0x1c5f, 0x1 * -0x4cabf + 0xa8c76 + -0x31 * -0x5d9));
const _0x215249 = {};
function _0x2169(_0x44230a, _0x483916) {
    const _0x5653ae = _0x1c5f();
    return _0x2169 = function (_0x4d5b0b, _0x6d9564) {
        _0x4d5b0b = _0x4d5b0b - (0x1438 + -0x203b + 0x1 * 0xcdf);
        let _0x15aac7 = _0x5653ae[_0x4d5b0b];
        return _0x15aac7;
    }, _0x2169(_0x44230a, _0x483916);
}
_0x215249[_0x1f7adc(0x102)] = !![], Object[_0x1f7adc(0xe5) + _0x1f7adc(0xf1)](exports, _0x1f7adc(0xde), _0x215249);
const sequelize_1 = require(_0x1f7adc(0xfe));
module[_0x1f7adc(0xee)] = {
    'up': _0x5e1446 => {
        const _0xcf0290 = _0x1f7adc, _0x21d227 = {};
        _0x21d227[_0xcf0290(0xf3)] = _0xcf0290(0xdf), _0x21d227[_0xcf0290(0xf9)] = _0xcf0290(0x106) + _0xcf0290(0xfa), _0x21d227[_0xcf0290(0xe7)] = _0xcf0290(0xfc), _0x21d227[_0xcf0290(0xe9)] = _0xcf0290(0x107), _0x21d227[_0xcf0290(0x109)] = _0xcf0290(0xed), _0x21d227[_0xcf0290(0xec)] = _0xcf0290(0xe8), _0x21d227[_0xcf0290(0x108)] = _0xcf0290(0xf0);
        const _0x1ffa0d = _0x21d227, _0x4bf020 = {};
        _0x4bf020[_0xcf0290(0xdd)] = !![];
        const _0x4f8186 = {};
        return _0x4f8186[_0xcf0290(0xdd)] = !![], Promise[_0xcf0290(0xeb)]([_0x5e1446[_0xcf0290(0xfd) + 'e'](_0x1ffa0d[_0xcf0290(0xf3)], {
                'id': {
                    'allowNull': ![],
                    'primaryKey': !![],
                    'type': sequelize_1[_0xcf0290(0x100)][_0xcf0290(0xe2)],
                    'defaultValue': sequelize_1[_0xcf0290(0xe6)][_0xcf0290(0x101)](_0x1ffa0d[_0xcf0290(0xf9)])
                },
                'sessionId': {
                    'type': sequelize_1[_0xcf0290(0x100)][_0xcf0290(0xf5)],
                    'references': {
                        'model': _0x1ffa0d[_0xcf0290(0xe7)],
                        'key': 'id'
                    },
                    'onUpdate': _0x1ffa0d[_0xcf0290(0xe9)],
                    'onDelete': _0x1ffa0d[_0xcf0290(0x109)]
                },
                'name': {
                    'type': sequelize_1[_0xcf0290(0x100)][_0xcf0290(0x103)],
                    'allowNull': ![],
                    'defaultValue': ''
                },
                'isActive': {
                    'type': sequelize_1[_0xcf0290(0x100)][_0xcf0290(0xe1)],
                    'allowNull': ![],
                    'defaultValue': !![]
                },
                'token': {
                    'type': sequelize_1[_0xcf0290(0x100)][_0xcf0290(0x103)],
                    'allowNull': !![],
                    'defaultValue': null
                },
                'userId': {
                    'type': sequelize_1[_0xcf0290(0x100)][_0xcf0290(0xf5)],
                    'references': {
                        'model': _0x1ffa0d[_0xcf0290(0xec)],
                        'key': 'id'
                    },
                    'onUpdate': _0x1ffa0d[_0xcf0290(0xe9)],
                    'onDelete': _0x1ffa0d[_0xcf0290(0x109)]
                },
                'tenantId': {
                    'type': sequelize_1[_0xcf0290(0x100)][_0xcf0290(0xf5)],
                    'references': {
                        'model': _0x1ffa0d[_0xcf0290(0x108)],
                        'key': 'id'
                    },
                    'onUpdate': _0x1ffa0d[_0xcf0290(0xe9)],
                    'onDelete': _0x1ffa0d[_0xcf0290(0xe9)],
                    'allowNull': ![],
                    'defaultValue': 0x1
                },
                'urlServiceStatus': {
                    'type': sequelize_1[_0xcf0290(0x100)][_0xcf0290(0xf2)],
                    'allowNull': !![],
                    'defaultValue': null,
                    'validate': _0x4bf020
                },
                'urlMessageStatus': {
                    'type': sequelize_1[_0xcf0290(0x100)][_0xcf0290(0xf2)],
                    'allowNull': !![],
                    'defaultValue': null,
                    'validate': _0x4f8186
                },
                'createdAt': {
                    'type': sequelize_1[_0xcf0290(0x100)][_0xcf0290(0x104)],
                    'allowNull': ![]
                },
                'updatedAt': {
                    'type': sequelize_1[_0xcf0290(0x100)][_0xcf0290(0x104)],
                    'allowNull': ![]
                }
            })]);
    },
    'down': _0x11f163 => {
        const _0x21718e = _0x1f7adc, _0x565c43 = {};
        _0x565c43[_0x21718e(0xf4)] = _0x21718e(0xdf);
        const _0x2219c2 = _0x565c43;
        return Promise[_0x21718e(0xeb)]([_0x11f163[_0x21718e(0xfb)](_0x2219c2[_0x21718e(0xf4)])]);
    }
};