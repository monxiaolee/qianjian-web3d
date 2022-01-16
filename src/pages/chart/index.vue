<template>
  <div id="myChart" :style="{width: '900px', height: '600px'}"></div>
</template>

<script>
var symbols = [
    'path://M1174.63988 1024l535.631054-804.028808 535.61257 804.028808z M3418.23144 0.517536l2.273461 18.354037L2.254977 439.387881l-2.254977-18.335553z'
];
let waiquanColors = ['rgba(255, 192, 81, 1)', 'rgba(35, 255, 252, 1)']
let neiquanColors = ['rgba(255, 192, 81, .2)', 'rgba(35, 255, 252, .2)']
export default {
    data() {
        return {
            dataList: [
                {
                    name: '男性',
                    value: 80
                },
                {
                    name: '女性',
                    value: 10
                }
            ],
            singleRing: [{
                name: '女性',
                value: 10
            }],
            waiquandData: [],
            neiquanData: [],
            singleRingWaiquanData: [],
            singleRingNeiquanData: []
        };
    },
    methods: {
        drawLine() {
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById('myChart'));


            let sum = this.dataList.reduce((prev, curr) => prev + curr.value, 0);
            let startAngle = 180 - (this.dataList[0].value / sum - 0.02) * 180;

            for (let i = 0; i < this.dataList.length; i++) {
                this.waiquandData.push(
                    {
                        value: this.dataList[i].value,
                        name: this.dataList[i].name,
                        itemStyle: {
                            color: waiquanColors[i]
                        },
                        label: {
                            show: i == 1 ? true : false,
                            fontSize: 12,
                            color: 'transparent',
                            formatter: '{b} ({c})\n{d}%'
                        },
                        labelLine: {
                            show: i == 1 ? true : false,
                            length: 0, // 第一段
                            length2: 80, // 第二段
                            minAngle: 45,
                            lineStyle: {
                                color: waiquanColors[i]
                            }
                        }
                    },
                    {
                        value: sum * 0.02,
                        name: '',
                        itemStyle: {
                            color: 'rgba(0, 238, 164, 0)'
                        }
                    }
                );
                this.neiquanData.push({
                    value: this.dataList[i].value,
                    name: this.dataList[i].name,
                    itemStyle: {
                        color: neiquanColors[i]
                    }
                }, {
                    value: sum * 0.02,
                    name: '',
                    itemStyle: {
                        color: 'rgba(0, 238, 164, 0)'
                    }
                })
            }


            this.singleRingWaiquanData.push({
                value: this.singleRing[0].value,
                name: this.singleRing[0].name,
                itemStyle: {
                    color: waiquanColors[1]
                },
                label: {
                    show: false,
                    fontSize: 12,
                    color: '#fff',
                    formatter: '{b} ({c})\n{d}%'
                },
                labelLine: {
                    show: false,
                    length: 50, // 第一段
                    length2: 60, // 第二段
                    minAngle: 45,
                    lineStyle: {
                        color: waiquanColors[1]
                    }
                }
            })

            this.singleRingNeiquanData.push({
                value: this.singleRing[0].value,
                name: this.singleRing[0].name,
                itemStyle: {
                    color: neiquanColors[1]
                }
            })





            let option = {
                backgroundColor: '#000',
                color: ['#FFC051', '#25FF97'],
                tooltip: {
                    // 鼠标悬浮时的信息展示框
                    backgroundColor: 'rgba(2, 2, 2, 0.8)',
                    borderColor: '#195760',
                    borderWidth: 1,
                    padding: 12,
                    extraCssText: 'border-radius:0;',
                    trigger: 'axis'
                },
                grid: {
                    top: 120
                },
                
                series: [
                    {
                        name: '外圈',
                        type: 'pie',
                        radius: ['61', '57'],
                        clockwise: false, // 饼图的扇区是否是顺时针排布
                        startAngle: startAngle,
                        // silent: true,
                        center: ['30%', '50%'],
                        data: this.waiquandData
                    },
                    {
                        name: '内环',
                        type: 'pie',
                        radius: ['57', '39'],
                        clockwise: false, // 饼图的扇区是否是顺时针排布
                        startAngle: startAngle,
                        // silent: true,
                        label: {
                            normal: {
                                show: true,
                                position: 'center',
                                formatter: () => {
                                    return (
                                        '{value|总数' + '\n' + '} {total|' + '11' + '}'
                                    );
                                },
                                rich: {
                                    value: {
                                        color: '#b7d5f8',
                                        fontSize: 18,
                                        lineHeight: 24
                                    },
                                    total: {
                                        color: '#ffffff',
                                        fontSize: 12,
                                        lineHeight: 20,
                                        padding: [0, 0, 0, 0]
                                    }
                                }
                            }
                        },
                        center: ['30%', '50%'],
                        data: this.neiquanData
                    },
                    {
                        name: '装饰外圈细',
                        type: 'pie',
                        radius: ['77', '78'],
                        clockwise: true, // 饼图的扇区是否是顺时针排布
                        startAngle: 0,
                        silent: true, // 图形是否不响应和触发鼠标事件
                        label: {
                            show: false
                        },
                        center: ['30%', '50%'],
                        data: [
                            {
                                value: 15,
                                itemStyle: {
                                    color: '#72828D00'
                                }
                            },
                            {
                                value: 50,
                                itemStyle: {
                                    color: '#72828D'
                                }
                            },
                            {
                                value: 15,
                                itemStyle: {
                                    color: '#72828D00'
                                }
                            },
                            {
                                value: 15,
                                itemStyle: {
                                    color: '#72828D00'
                                }
                            },
                            {
                                value: 50,
                                itemStyle: {
                                    color: '#72828D'
                                }
                            },
                            {
                                value: 15,
                                itemStyle: {
                                    color: '#72828D00'
                                }
                            }
                        ]
                    },
                    {
                        name: '装饰外圈粗',
                        type: 'pie',
                        radius: ['76', '78'],
                        clockwise: true, // 饼图的扇区是否是顺时针排布
                        startAngle: 0,
                        silent: true, // 图形是否不响应和触发鼠标事件
                        label: {
                            show: false
                        },
                        center: ['30%', '50%'],
                        data: [
                            {
                                value: 10,
                                itemStyle: {
                                    color: '#ffffff00'
                                }
                            },
                            {
                                value: 4,
                                itemStyle: {
                                    color: '#ffffff'
                                }
                            },
                            {
                                value: 28,
                                itemStyle: {
                                    color: '#ffffff00'
                                }
                            },
                            {
                                value: 4,
                                itemStyle: {
                                    color: '#ffffff'
                                }
                            },
                            {
                                value: 18,
                                itemStyle: {
                                    color: '#ffffff00'
                                }
                            },
                            {
                                value: 4,
                                itemStyle: {
                                    color: '#ffffff'
                                }
                            },
                            {
                                value: 28,
                                itemStyle: {
                                    color: '#ffffff00'
                                }
                            },
                            {
                                value: 4,
                                itemStyle: {
                                    color: '#ffffff'
                                }
                            },
                            {
                                value: 10,
                                itemStyle: {
                                    color: '#ffffff00'
                                }
                            }
                        ]
                    },




                    // 连接线
                    // {
                    //     type: 'pictorialBar',
                    //     name: '',
                    //     symbolSize: ['100%', '30%'],
                    //     symbolPosition: 'center',
                    //     symbolOffset: [0, '60%'],
                    //     z: 10,
                    //     data: [{
                    //         value: 30,
                    //         symbol: symbols[0],

                    //         itemStyle: {
                    //             normal: {
                    //                 color: '#eee'
                    //             }
                    //         }
                    //     }]
                    // },



                    // 第二个
                    {
                        name: '外圈',
                        type: 'pie',
                        radius: ['61', '57'],
                        clockwise: true, // 饼图的扇区是否是顺时针排布
                        startAngle: 0,
                        silent: true,
                        center: ['70%', '50%'],
                        
                        data: this.singleRingWaiquanData
                    },
                    {
                        name: '内环',
                        type: 'pie',
                        radius: ['57', '39'],
                        clockwise: true, // 饼图的扇区是否是顺时针排布
                        startAngle: 0,
                        silent: true,
                        // label: {
                        //     show: false
                        // },
                        label: {
                            normal: {
                                show: true,
                                position: 'center',
                                formatter: () => {
                                    return (
                                        '{value|总数' + '\n' + '} {total|' + '11' + '}'
                                    );
                                },
                                rich: {
                                    value: {
                                        color: '#b7d5f8',
                                        fontSize: 18,
                                        lineHeight: 24
                                    },
                                    total: {
                                        color: '#ffffff',
                                        fontSize: 12,
                                        lineHeight: 20,
                                        padding: [0, 0, 0, 0]
                                    }
                                }
                            }
                        },
                        center: ['70%', '50%'],
                        data: this.singleRingNeiquanData
                    },
                    {
                        name: '装饰外圈细',
                        type: 'pie',
                        radius: ['77', '78'],
                        clockwise: true, // 饼图的扇区是否是顺时针排布
                        startAngle: 0,
                        silent: true, // 图形是否不响应和触发鼠标事件
                        label: {
                            show: false
                        },
                        center: ['70%', '50%'],
                        data: [
                            {
                                value: 15,
                                itemStyle: {
                                    color: '#72828D00'
                                }
                            },
                            {
                                value: 50,
                                itemStyle: {
                                    color: '#72828D'
                                }
                            },
                            {
                                value: 15,
                                itemStyle: {
                                    color: '#72828D00'
                                }
                            },
                            {
                                value: 15,
                                itemStyle: {
                                    color: '#72828D00'
                                }
                            },
                            {
                                value: 50,
                                itemStyle: {
                                    color: '#72828D'
                                }
                            },
                            {
                                value: 15,
                                itemStyle: {
                                    color: '#72828D00'
                                }
                            }
                        ]
                    },
                    {
                        name: '装饰外圈粗',
                        type: 'pie',
                        radius: ['76', '78'],
                        clockwise: true, // 饼图的扇区是否是顺时针排布
                        startAngle: 0,
                        silent: true, // 图形是否不响应和触发鼠标事件
                        label: {
                            show: false
                        },
                        center: ['70%', '50%'],
                        data: [
                            {
                                value: 10,
                                itemStyle: {
                                    color: '#ffffff00'
                                }
                            },
                            {
                                value: 4,
                                itemStyle: {
                                    color: '#ffffff'
                                }
                            },
                            {
                                value: 28,
                                itemStyle: {
                                    color: '#ffffff00'
                                }
                            },
                            {
                                value: 4,
                                itemStyle: {
                                    color: '#ffffff'
                                }
                            },
                            {
                                value: 18,
                                itemStyle: {
                                    color: '#ffffff00'
                                }
                            },
                            {
                                value: 4,
                                itemStyle: {
                                    color: '#ffffff'
                                }
                            },
                            {
                                value: 28,
                                itemStyle: {
                                    color: '#ffffff00'
                                }
                            },
                            {
                                value: 4,
                                itemStyle: {
                                    color: '#ffffff'
                                }
                            },
                            {
                                value: 10,
                                itemStyle: {
                                    color: '#ffffff00'
                                }
                            }
                        ]
                    }
                ]
            };
            // 绘制图表
            myChart.setOption(option);
        }
    },
    mounted() {
        this.drawLine();
    }
};
</script>

<style>
</style>