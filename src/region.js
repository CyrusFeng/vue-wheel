const arr = [
  {
    "id": 1,
    "name": "北京",
    "parentId": 0,
    "isLeaf":false
  },
  {
    "id": 2,
    "name": "天津",
    "parentId": 0,
    "isLeaf":false
  },
  {
    "id": 3,
    "name": "上海",
    "parentId": 0
  },
  {
    "id": 4,
    "name": "重庆",
    "parentId": 0
  },
  {
    "id": 5,
    "name": "河北",
    "parentId": 0
  },
  {
    "id": 6,
    "name": "山西",
    "parentId": 0
  },
  {
    "id": 7,
    "name": "内蒙古",
    "parentId": 0
  },
  {
    "id": 8,
    "name": "辽宁",
    "parentId": 0
  },
  {
    "id": 9,
    "name": "吉林",
    "parentId": 0
  },
  {
    "id": 10,
    "name": "黑龙江",
    "parentId": 0
  },
  {
    "id": 11,
    "name": "江苏",
    "parentId": 0
  },
  {
    "id": 12,
    "name": "浙江",
    "parentId": 0
  },
  {
    "id": 13,
    "name": "安徽",
    "parentId": 0
  },
  {
    "id": 14,
    "name": "福建",
    "parentId": 0
  },
  {
    "id": 15,
    "name": "江西",
    "parentId": 0
  },
  {
    "id": 16,
    "name": "山东",
    "parentId": 0
  },
  {
    "id": 17,
    "name": "河南",
    "parentId": 0
  },
  {
    "id": 18,
    "name": "湖北",
    "parentId": 0
  },
  {
    "id": 19,
    "name": "湖南",
    "parentId": 0
  },
  {
    "id": 20,
    "name": "广东",
    "parentId": 0
  },
  {
    "id": 21,
    "name": "广西",
    "parentId": 0
  },
  {
    "id": 22,
    "name": "海南",
    "parentId": 0
  },
  {
    "id": 23,
    "name": "四川",
    "parentId": 0
  },
  {
    "id": 24,
    "name": "贵州",
    "parentId": 0
  },
  {
    "id": 25,
    "name": "云南",
    "parentId": 0
  },
  {
    "id": 26,
    "name": "西藏",
    "parentId": 0
  },
  {
    "id": 27,
    "name": "陕西",
    "parentId": 0
  },
  {
    "id": 28,
    "name": "甘肃",
    "parentId": 0
  },
  {
    "id": 29,
    "name": "青海",
    "parentId": 0
  },
  {
    "id": 30,
    "name": "宁夏",
    "parentId": 0
  },
  {
    "id": 31,
    "name": "新疆",
    "parentId": 0
  },
  {
    "id": 32,
    "name": "台湾",
    "parentId": 0
  },
  {
    "id": 33,
    "name": "香港",
    "parentId": 0
  },
  {
    "id": 34,
    "name": "澳门",
    "parentId": 0
  },
  {
    "id": 35,
    "name": "海外",
    "parentId": 0
  },
  {
    "id": 36,
    "name": "东城",
    "parentId": 1,
    "isLeaf":true
  },
  {
    "id": 37,
    "name": "西城",
    "parentId": 1,
    "isLeaf":true
  },
  {
    "id": 40,
    "name": "朝阳",
    "parentId": 1,
    "isLeaf":true
  },

  {
    "id": 400,
    "name": "朝阳弟弟",
    "parentId": 40
  },

  {
    "id": 41,
    "name": "丰台",
    "parentId": 1,
    "isLeaf":true
  },
  {
    "id": 42,
    "name": "石景山",
    "parentId": 1,
    "isLeaf":true
  },
  {
    "id": 43,
    "name": "海淀",
    "parentId": 1,
    "isLeaf":true
  },
  {
    "id": 44,
    "name": "门头沟",
    "parentId": 1,
    "isLeaf":true
  },
  {
    "id": 45,
    "name": "房山",
    "parentId": 1,
    "isLeaf":true
  },
  {
    "id": 46,
    "name": "通州",
    "parentId": 1,
    "isLeaf":true
  },
  {
    "id": 47,
    "name": "顺义",
    "parentId": 1,
    "isLeaf":true
  },
  {
    "id": 48,
    "name": "昌平",
    "parentId": 1,
    "isLeaf":true
  },
  {
    "id": 49,
    "name": "大兴",
    "parentId": 1,
    "isLeaf":true
  },
  {
    "id": 50,
    "name": "怀柔",
    "parentId": 1,
    "isLeaf":true
  },
  {
    "id": 51,
    "name": "平谷",
    "parentId": 1,
    "isLeaf":true
  },
  {
    "id": 52,
    "name": "密云",
    "parentId": 1,
    "isLeaf":true
  },
  {
    "id": 53,
    "name": "延庆",
    "parentId": 1,
    "isLeaf":true
  },
  {
    "id": 54,
    "name": "和平",
    "parentId": 2
  },
  {
    "id": 55,
    "name": "河东",
    "parentId": 2
  },
  {
    "id": 56,
    "name": "河西",
    "parentId": 2
  },
  {
    "id": 57,
    "name": "南开",
    "parentId": 2
  },
  {
    "id": 58,
    "name": "河北",
    "parentId": 2
  },
  {
    "id": 59,
    "name": "红桥",
    "parentId": 2
  },
  {
    "id": 60,
    "name": "东丽",
    "parentId": 2
  },
  {
    "id": 61,
    "name": "西青",
    "parentId": 2
  },
  {
    "id": 62,
    "name": "津南",
    "parentId": 2
  },
  {
    "id": 63,
    "name": "北辰",
    "parentId": 2
  },
  {
    "id": 64,
    "name": "武清",
    "parentId": 2
  },
  {
    "id": 65,
    "name": "宝坻",
    "parentId": 2
  },
  {
    "id": 66,
    "name": "滨海新区",
    "parentId": 2
  },
  {
    "id": 67,
    "name": "宁河",
    "parentId": 2
  },
  {
    "id": 68,
    "name": "蓟州",
    "parentId": 2
  },
  {
    "id": 69,
    "name": "静海",
    "parentId": 2
  }
]


export default arr