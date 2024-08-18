'use strict';
function _0x5e0f() {
    const _0x2485fe = [
        '301203njByrl',
        'exports',
        'qCKTz',
        'vsCCp',
        'INTEGER',
        'ocols',
        'DATE',
        '415896HvRYDO',
        'erty',
        'Users',
        'primaryKey',
        'type',
        'sequelize',
        '962680tCTJVr',
        'STRING',
        '40VaPMBp',
        'autoIncrem',
        '959022uMeryf',
        'SET\x20NULL',
        'value',
        'TicketProt',
        '486745PQtqmg',
        'MGMzX',
        'ent',
        '7fjkpdt',
        'QyJes',
        'GmABY',
        '4177305xzSurx',
        'IGune',
        'allowNull',
        'defineProp',
        'Tenants',
        '__esModule',
        'Ulxso',
        '2348XtDsqb',
        'dropTable',
        'createTabl',
        'DataTypes',
        'CASCADE',
        '1779nbmwYF',
        'RESTRICT'
    ];
    _0x5e0f = function () {
        return _0x2485fe;
    };
    return _0x5e0f();
}
const _0x3792a1 = _0x1698;
(function (_0x493939, _0xe52797) {
    const _0x47d781 = _0x1698, _0x4abbef = _0x493939();
    while (!![]) {
        try {
            const _0x25dbef = parseInt(_0x47d781(0x11e)) / (-0x10 * 0x9d + 0x1dd6 + -0x1405) + -parseInt(_0x47d781(0x11a)) / (0x117 * 0x12 + -0xa9b + -0x901 * 0x1) + parseInt(_0x47d781(0x107)) / (-0xc9 * -0xf + -0xa4 * 0x15 + 0x1b0) * (-parseInt(_0x47d781(0x102)) / (0x6 * 0x53a + 0x1a71 + -0x39c9)) + parseInt(_0x47d781(0x124)) / (-0x9 * -0x10a + -0x2595 + 0x20 * 0xe2) + parseInt(_0x47d781(0x110)) / (-0x7ff + 0x229 * 0x3 + 0x1 * 0x18a) + parseInt(_0x47d781(0x121)) / (-0x22a5 + 0xa5c + 0x1850) * (-parseInt(_0x47d781(0x116)) / (0x1bcb + -0x4f5 + 0x7 * -0x342)) + parseInt(_0x47d781(0x109)) / (0x164c + -0x112b + -0x518) * (parseInt(_0x47d781(0x118)) / (-0xb4a + -0x1f17 + 0x2a6b));
            if (_0x25dbef === _0xe52797)
                break;
            else
                _0x4abbef['push'](_0x4abbef['shift']());
        } catch (_0x660c53) {
            _0x4abbef['push'](_0x4abbef['shift']());
        }
    }
}(_0x5e0f, 0x111e85 + -0x7 * 0x1ad8c + 0x36ffc));
function _0x1698(_0x5c8681, _0x37e8d2) {
    const _0x983065 = _0x5e0f();
    return _0x1698 = function (_0x2f87c0, _0x1814e7) {
        _0x2f87c0 = _0x2f87c0 - (-0x1d3 * -0x12 + 0x25ae + 0x1 * -0x4586);
        let _0x132577 = _0x983065[_0x2f87c0];
        return _0x132577;
    }, _0x1698(_0x5c8681, _0x37e8d2);
}
const _0x20c2f8 = {};
_0x20c2f8[_0x3792a1(0x11c)] = !![], Object[_0x3792a1(0xfe) + _0x3792a1(0x111)](exports, _0x3792a1(0x100), _0x20c2f8);
const sequelize_1 = require(_0x3792a1(0x115));
module[_0x3792a1(0x10a)] = {
    'up': _0x125737 => {
        const _0x576d12 = _0x3792a1, _0x6f4c4a = {};
        _0x6f4c4a[_0x576d12(0x125)] = _0x576d12(0x11d) + _0x576d12(0x10e), _0x6f4c4a[_0x576d12(0x11f)] = _0x576d12(0x106), _0x6f4c4a[_0x576d12(0x101)] = _0x576d12(0x108), _0x6f4c4a[_0x576d12(0x10b)] = _0x576d12(0x112), _0x6f4c4a[_0x576d12(0x123)] = _0x576d12(0x11b), _0x6f4c4a[_0x576d12(0x122)] = _0x576d12(0xff);
        const _0x196751 = _0x6f4c4a, _0x20e3ac = {};
        return _0x20e3ac[_0x576d12(0x114)] = sequelize_1[_0x576d12(0x105)][_0x576d12(0x10d)], _0x20e3ac[_0x576d12(0x119) + _0x576d12(0x120)] = !![], _0x20e3ac[_0x576d12(0x113)] = !![], _0x20e3ac[_0x576d12(0x126)] = ![], _0x125737[_0x576d12(0x104) + 'e'](_0x196751[_0x576d12(0x125)], {
            'id': _0x20e3ac,
            'protocol': {
                'type': sequelize_1[_0x576d12(0x105)][_0x576d12(0x117)],
                'onUpdate': _0x196751[_0x576d12(0x11f)],
                'onDelete': _0x196751[_0x576d12(0x101)],
                'allowNull': ![]
            },
            'ticketId': {
                'type': sequelize_1[_0x576d12(0x105)][_0x576d12(0x10d)],
                'onUpdate': _0x196751[_0x576d12(0x11f)],
                'onDelete': _0x196751[_0x576d12(0x11f)],
                'allowNull': ![]
            },
            'userId': {
                'type': sequelize_1[_0x576d12(0x105)][_0x576d12(0x10d)],
                'references': {
                    'model': _0x196751[_0x576d12(0x10b)],
                    'key': 'id'
                },
                'onUpdate': _0x196751[_0x576d12(0x11f)],
                'onDelete': _0x196751[_0x576d12(0x123)]
            },
            'tenantId': {
                'type': sequelize_1[_0x576d12(0x105)][_0x576d12(0x10d)],
                'references': {
                    'model': _0x196751[_0x576d12(0x122)],
                    'key': 'id'
                },
                'onUpdate': _0x196751[_0x576d12(0x11f)],
                'onDelete': _0x196751[_0x576d12(0x11f)],
                'allowNull': ![]
            },
            'createdAt': {
                'type': sequelize_1[_0x576d12(0x105)][_0x576d12(0x10f)],
                'allowNull': ![]
            },
            'updatedAt': {
                'type': sequelize_1[_0x576d12(0x105)][_0x576d12(0x10f)],
                'allowNull': ![]
            }
        });
    },
    'down': _0x31a604 => {
        const _0x121ed5 = _0x3792a1, _0x4b5263 = {};
        _0x4b5263[_0x121ed5(0x10c)] = _0x121ed5(0x11d) + _0x121ed5(0x10e);
        const _0x443c4f = _0x4b5263;
        return _0x31a604[_0x121ed5(0x103)](_0x443c4f[_0x121ed5(0x10c)]);
    }
};