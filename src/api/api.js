import axios from 'axios'
// import qs from 'qs' 
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

let base_url = "";
let env = process.env.NODE_ENV;
if(env === "development") {
    // base_url = "http://172.17.6.123:8080/trade-support/";
    base_url = "http://172.17.6.123:8089/trade/"
}else{
    base_url = "";
}

const get_url = base_url + "get"
const post_url = base_url + "post" + "/" + "problem"
const download_url = base_url + 'exportFiles'
const enterprise_url = base_url + 'enterprise/getMapData'

// const industrialLand_url = base_url + ''
const Url = {
    getMsgContent: get_url,
    downloadFile: download_url,
    submitInTrade: base_url + "post" + "/" + "proj",
    enterpriseMsg: enterprise_url
    // indutrialLand: industrialLand_url  //产业用地
}

export const publicRequirest = {
    //规划信息第一步请求
    getMsgContent: function(param) {
        return axios({
            method: 'post',
            url: Url.getMsgContent,
            data: param
        })
    },
    //规划信息弹窗文件下载和上传时间请求
    getFileTime: function(bid){
        return axios({
            method: 'post',
            url: Url.getMsgContent,
            data: {
                "[]": {
                    "TsupFile": {
                        "pid": bid,
                        "@column": "url,filename,uploadtime"
                    }
                },
                "format": true
            }
        })
    },
    //文件下载请求
    downloadFile: function(urls){
        return axios.get(Url.downloadFile,{
            params: {
                url: urls
            }
        })
    },
    // downloadFile: function(url){
    //     return axios({
    //         method: 'post',
    //         url: Url.downloadFile,
    //         data: {
    //             url: url
    //         }
    //     })
    // },

    //政策信息请求
    getPolicyMsg: function(num) {
        return axios({
            method: 'post',
            url: Url.getMsgContent,
            data: {
                "[]": {
                    "TsupPolicy": {
                        'classify': num,
                        '@column': 'bid,title,content',
                        '@order': 'modifydate-'
                    }
                },
                "format": true
            }
        })
    },

    //载体信息
    /**
     * 重点片区数据
     * @param {片区类型} pctype 
     * @param {地图范围参数} polygon 
     */
    getImportKeyArea: function(pctype,polygon) {
        return axios({
            method: 'post',
            url: Url.getMsgContent,
            data: {
                "[]": {
                    "query": 2,
                    "ViewPiece": {
                        "@column": "bid,names,startlevel,geometrypoly,geometrypoint,inf,introimg",
                        "pctype$": pctype,
                        "geompoly#intersects#wkt": polygon
                    }
                },
                "total@": "/[]/total",
                "format": true
            }
        })
    },

    //初始点击重点片区时加载重点片区
    getImportKeyAreaInit: function(polygon) {
        return axios({
            method: 'post',
            url: Url.getMsgContent,
            data: {
                "[]": {
                    "query": 2,
                    "ViewPiece": {
                        "@column": "bid,names,startlevel,geometrypoly,geometrypoint,inf,introimg",
                        "geompoly#intersects#wkt": polygon
                    }
                },
                "total@": "/[]/total",
                "format": true
            }
        })
    },

    /**
     * 右键地图查看当前位置片区
     * @param {当前地图上的点位置} point  "POINT(121343.789519401 31225.6813497923)"
     */
    getCurrentArea: function(point) {
        return axios({
            method: 'post',
            url: Url.getMsgContent,
            data: {
                "[]": {
                    "query": 2,
                    "ViewPiece": {
                        "@column": "bid,names,startlevel,geometrypoly,geometrypoint,inf,introimg",
                        "geompoly#intersecting#wkt": point
                    }
                },
                "total@": "/[]/total",
                "format": true
            }
        })
    },

    /**
     * 片区详情里的地块信息
     * @param {当前片区的bid} bid 
     */
    getKeyAreaDetailland: function(bid) {
        return axios({
            method: 'post',
            url: Url.getMsgContent,
            data: {
                "[]": {
                    "ViewPiece": {
                        "@column": "bid,names,inf,introimg,jdname,orientation,developtarget,accessconditions,linkurl",
                        "bid": bid
                    }
                },
                "total@": "/[]/total",
                "format": true
            }
        })
    },

    /**
     * 图片类型数据
     * @param {图片类型1为风光图片，0为规则图片} ptype 
     * @param {当前片区的bid} bid 
     */
    getKeyAreaDetailImage: function(ptype,bid) {
        return axios({
            method: 'post',
            url: Url.getMsgContent,
            data: {
                "[]": {
                    "query": 2,
                    "TsupPhoto": {
                        "@column": "url",
                        "ptype": ptype,
                        "pid": bid
                    }
                },
                "total@": "/[]/total",
                "format": true
            }
        })
    },

    /**
     * 片区详情里的产业用地表格
     * @param {当前片区的bid} bid 
     * @param {产业用地页码} page 
     */
    getKeyAreaIndustrailLand: function(bid,page) {
        return axios({
            method: 'post',
            url: Url.getMsgContent,
            data: {
                "[]": {
                    "query": 2,
                    "count": 6,
                    "page": page-1,
                    "TsupLand": {
                        "@column": "bid,pid,names,ownership,unit,contact,tel",
                        "pid": bid,
                        "publishstatus": 1
                    }
                },
                "total@": "/[]/total",
                "format": true
            }
        })
    },

    /**
     * @param {片区参数} pccategory 
     * @param {街道参数} jdcode 
     * @param {地图范围参数} polygon 
     */
    getIndustrialLand: function(pccategory,jdcode,polygon) {  //产业用地
        return axios({
            method: 'post',
            url: Url.getMsgContent,
            data: {
                '[]': {
                    'ViewLand': {
                        '@column': 'bid,geometry,introimg,names,landproperty,landstatus,jdname,orientation,area,unit,tel,contact,unit2,tel2,contact2',
                        'pccategory': pccategory,
                        'jdcode{}': jdcode,
                        'geom#intersects#wkt': polygon
                    }
                },
                "format": true
            }
        })
    },

    /**
     * @param {1为创新产业园，0为其他园区} pccategory 
     * @param {片区参数} pkcategory 
     * @param {街道参数} jdcode 
     * @param {地图范围参数} polygon 
     */
    getIndustrialHouse: function(pccategory,pkcategory,jdcode,polygon) {  //产业用房
        return axios({
            method: 'post',
            url: Url.getMsgContent,
            data: {
                '[]': {
                    'ViewParkBuild': {
                        '@column': 'bid,geometry,introimg,names,parttype,partstatus,floorarea,buildarea,dormarea,vacantarea,linkman,tel',
                        'pccategory': pccategory,
                        "pkcategory{}": pkcategory,
                        'jdcode{}': jdcode,
                        'geom#intersects#wkt': polygon
                    }
                },
                "format": true
            }
        })
    },

    /**
     * 创新产业园
     * @param {街道参数} jdcode 
     * @param {地图范围参数} polygon 
     */
    getInnovativeIndustrialPark: function(jdcode,polygon) {
        return axios({
            method: 'post',
            url: Url.getMsgContent,
            data: {
                "[]": {
                    "ViewParkBuild": {
                        "@column": "bid,introimg,geometry,names,parttype,partstatus,floorarea,buildarea,dormarea,vacantarea,linkman,tel",
                        "jdcode{}": jdcode,
                        "geom#intersects#wkt": polygon
                    }
                },
                "format": true
            }
        })
    },

    /**
     * 创客园区
     * @param {街道参数} jdcode 
     * @param {地图范围参数} polygon 
     */
    getGuestParkMark: function(jdcode,polygon) {
        return axios({
            method: 'post',
            url: Url.getMsgContent,
            data: {
                "[]": {
                    "query": 2,
                    "ViewCreateSpace": {
                        "@column": "bid,infimg,geometry,names,area,isoperate",
                        "jdcode{}": jdcode,
                        "geom#intersects#wkt": polygon
                    }
                },
                "format": true
            }
        })
    },

    //产业用地详情页
    /**
     * 地块详细信息
     * @param {坐标点的bid} bid 
     */
    getAreaMsg: function(bid) {
        return axios({
            method: 'post',
            url: Url.getMsgContent,
            data: {
                "[]": {
                    "query": 2,
                    "ViewLand": {
                        "@column": "bid,introimg,names,landproperty,landstatus,jdname,address,ownership,area,referenceprice,unit,tel,contact,unit2,tel2,contact2,orientation,accessconditions,geometry",
                        "bid": bid
                    }
                },
                "format": true
            }
        })
    },
    
    /**
     * 土地招拍挂信息
     * @param {页码数} page 
     */
    getLandaInfor: function(page) {
        return axios({
            method: 'post',
            url: Url.getMsgContent,
            data: {
                "[]": {
                    "query": 2,
                    "count": 8,
                    "page": page-1,
                    "TsupZpg": {
                        "@column": "zdcode,use,transdate,address,curstatus,linkurl",
                        "@order": "transdate-,zdcode+"
                    }
                },
                "total@": "/[]/total",
                "format": true
            }
        })
    },


    //产业用房详情页
    /**
     * 地块详细信息
     * @param {坐标点的bid} bid 
     */
    getAreaNsgHouse: function(bid){
        return axios({
            method: 'post',
            url: Url.getMsgContent,
            data: {
                "[]": {
                    "ViewParkBuild": {
                        "@column": "bid,introimg,names,parttype,partstatus,jdname,address,orientation,rentalprice,partproperty,buildtotal,floorarea,buildarea,vacantarea,dormarea,parkinglot,elevator,diningroom,dormitory,othersupports,partadminstation,linkman,tel,parturl,intro,accessconditions,geometry",
                        "bid": bid
                    }
                },
                "format": true
            }
        })
    },

    /**
     * 地块详细信息里的主要企业
     * @param {坐标点的bid} bid 
     */
    getImportantEnterprise: function(bid) {
        return axios({
            method: 'post',
            url: Url.getMsgContent,
            data: {
                "[]": {
                    "TsupEnterprise": {
                        "@column": "names",
                        "ismainent": "是",
                        "pid": bid
                    }
                },
                "format": true
            }
        })
    },

    /**
     * 同类园区推介
     * @param {坐标点的bid} bid 
     * @param {地块详细信息里的产业定位、为数组形式} orientation 
     */
    getSimilarPark: function(bid,orientation) {
        return axios({
            method: 'post',
            url: Url.getMsgContent,
            data: {
                "[]": {
                    "TsupPark": {
                        "@column": "bid,names,jdname,vacantarea,introimg",
                        "vacantarea!{}": [
                            "",
                            "0"
                        ],
                        "introimg!": "",
                        "bid!": bid,
                        "orientation$": orientation
                    }
                },
                "format": true
            }
        })
    },

    /**
     * 重点园区推介
     * @param {坐标点的bid} bid 
     */
    getImportantPark: function(bid,page) {
        return axios({
            method: 'post',
            url: Url.getMsgContent,
            data: {
                "[]": {
                    "query": 2,
                    "count": 6,
                    "page": page-1,
                    "TsupPark": {
                        "@column": "bid,names,jdname",
                        "publishstatus": 1,
                        "ispromotion": "是",
                        "bid!": bid,
                        "@order": "modifydate-"
                    }
                },
                "total@": "/[]/total",
                "format": true
            }
        })
    },

    getRentSaleMsg: function(bid,page) {
        return axios({
            method: 'post',
            url: Url.getMsgContent,
            data: {
                "[]": {
                    "query": 2,
                    "count": 6,
                    "page": page-1,
                    "ViewBuilding": {
                        "@column": "bid,pid,bname,rental,area,pricel,priceh,contact,tel,use",
                        "pid": bid
                    }
                },
                "total@": "/[]/total",
                "format": true
            }
        })
    },


    //创客园区
    /**
     * 创客园区土地详情信息
     * @param {坐标点的bid} bid 
     */
    getGuestPark: function(bid) {
        return axios({
            method: 'post',
            url: Url.getMsgContent,
            data: {
                "[]": {
                    "ViewCreateSpace": {
                        "@column": "bid,infimg,geometry,names,area,isoperate,jdname,address,introduction,investors",
                        "bid": bid
                    }
                },
                "format": true
            }
        })
    },

    //工业区信息
    /**
     * 获取工业区信息点数据
     * @param {街道参数} jdcode 
     * @param {改造方式参数} transformway 
     * @param {地图范围} polygon 
     */
    getIndustrailParkMark: function(jdcode,transformway,polygon) {
        return axios({
            method: 'post',
            url: Url.getMsgContent,
            data: {
                "[]": {
                    "query": 2,
                    "ViewInd": {
                        "@column": "bid,transformway,jdname,geometrypoint,names,img,indbrief",
                        "jdcode{}": jdcode,
                        "transformway{}": transformway,
                        "geompoint#intersects#wkt": polygon
                    }
                },
                "total@": "/[]/total",
                "format": true
            }
        })
    },

    /**
     * 开发商数据
     * @param {开发商页数} page 
     */
    getDeveloperInfor: function(page) {
        return axios({
            method: 'post',
            url: Url.getMsgContent,
            data: {
                "[]": {
                    "count": 10,
                    "page": page-1,
                    "query": 2,
                    "TsupOperator": {
                        "@cloumn": "bid,bname,bintro,bper,bnum"
                    }
                },
                "total@": "/[]/total",
                "format": true
            }
        })
    },

    /**
     * 基本信息数据
     * @param {数据点bid} bid 
     */
    getIndustrailBaseInfor: function(bid) {
        return axios({
            method: 'post',
            url: Url.getMsgContent,
            data: {
                "[]": {
                    "query": 2,
                    "ViewInd": {
                        "@column": "bid,xh,names,transformway,totallands,industrytype,industry_perimeter,developstrong,legal_lands_area,legal_lands_scale,buliding_years,planning_info,transformwish,impiece_info,industrial_land_info,innovate_info,synthesize_del_require,industrial_plan_require,indcity_fuse_require,landplan_require,round_support,other_info,no_legal_lands_scale,industrial_landrate,no_industrial_landrate,geometrypoint,geometrypoly",
                        "bid": bid
                    }
                },
                "total@": "/[]/total",
                "format": true
            }
        })
    },

    /**
     * 入驻企业数据
     * @param {页码} page 
     * @param {企业名称} parkname 
     */
    getSettledEnterprise: function(page,parkname) {
        return axios({
            method: 'post',
            url: Url.getMsgContent,
            data: {
                "[]": {
                    "query": 2,
                    "count": 6,
                    "page": page-1,
                    "ViewSettledEnt": {
                        "@column": "bid,names,parkname,nature,industrytype",
                        "parkname": parkname
                    }
                },
                "total@": "/[]/total",
                "format": true
            }
        })
    },

    /**
     * 问题咨询插入问题内容
     * @param {数据点bid} bid 
     * @param {提交问题内容} question 
     */
    insertQuestions: function(bid,question) {
        return axios.post(post_url, {
            "pid": bid,
            "question": question
        })
    },

    /**
     * 获取所有问题咨询
     * @param {数据点bid} bid 
     * @param {页码} page 
     */
    getAllQuestionsAnswer: function(bid,page) {
        return axios({
            method: 'post',
            url: Url.getMsgContent,
            data: {
                "[]": {
                    "query": 2,
                    "count": 5,
                    "page": page-1,
                    "Problem": {
                        "@column": "question,answer",
                        "pid": bid,
                        "@order": "asktime-"
                    }
                },
                "total@": "/[]/total",
                "format": true
            }
        })
    },

    /**
     * 获取查询的问题咨询
     * @param {数据点bid} bid 
     * @param {所输入的问题条件} question 
     * @param {页码} page 
     */
    getQuestionsAnswer: function(bid,question,page) {
        return axios({
            method: 'post',
            url: Url.getMsgContent,
            data: {
                "[]": {
                    "query": 2,
                    "count": 5,
                    "page": page-1,
                    "Problem": {
                        "pid": bid,
                        "@column": "question,answer",
                        "question$": question,
                        "@order": "asktime-",
                    }
                },
                "total@": "/[]/total",
                "format": true
            }
        })
    },

    //企业信息
    getEnterpriseMsgMarks: function(param) {
        //{arrayFormat: 'brackets'}
        // return axios.post(Url.enterpriseMsg,qs.stringify(param,{ indices: false }))
        return axios.post(Url.enterpriseMsg,param);
        // return axios({
        //     method: 'post',
        //     url: Url.enterpriseMsg,
        //     data: param
        // })
    },

    getEnterpriseMsgMarks_1: function(jdcode,large_type,ptype,scale,enterprisetype,popular_industry,talent,trademarkinfo,hightech,listed) {
        return axios({
            method: 'post',
            url: Url.getMsgContent,
            data: {
                "[]": {
                    "query": 2,
                    "count": 10,
                    "page": 0,
                    "ViewEnterprise": {
                        "@column": "geometrypoint,bid,jdname,names,infimg,products,address,website,sellcontact,selltel",
                        "jdcode{}": jdcode,
                        "large_type{}": large_type,
                        "ptype{}": ptype,
                        "scale{}": scale,
                        "enterprisetype{}": enterprisetype,
                        "popular_industry{}": popular_industry,
                        "talent{}": talent,
                        "trademarkinfo{}": trademarkinfo,
                        "hightech{}": hightech,
                        "listed{}": listed,
                        "@combine": "large_type{},ptype{}"
                    }
                },
                "total@": "/[]/total",
                "format": true
            }
        })
    },

    /**
     * 企业详情信息
     * @param {数据点bid} bid 
     */
    getEnterpriseDetailMsg: function(bid) {
        return axios.get(Url.getMsgContent + '/' + encodeURIComponent(JSON.stringify({
            "[]": {
                "ViewEnterprise": {
                    "@column": "bid,ent_code,jdname,names,found_date,build_no,products,typename,ent_name,popular_industry,talent,address,owner_landarea,trademarkinfo,govcontact,govtel,patent,hightech,leasedate,other_resouce,listed,rental_factoryarea,owner_buildarea,employees_count,above_junior_count,website,rental_landarea,sellcontact,selltel",
                    "bid": bid
                }
            },
            "format": true
        })),{})
    },

    /**
     * 企业详情里的图片请求
     * @param {类型 5为详情的图片 6为企业产品图片} ptype 
     * @param {数据点bid} bid 
     */
    getEnterpriseDetailPic: function(ptype,bid) {
        return axios.get(Url.getMsgContent + '/' + encodeURIComponent(JSON.stringify({
            "[]": {
                "query": 2,
                "TsupPhoto": {
                    "@column": "url",
                    "ptype": ptype,
                    "pid": bid
                }
            },
            "format": true
        })),{})
    },

    /**
     * 头部搜索栏第一个产业用地
     * @param {搜索输入的条件} searchValue 
     */
    getSearchByFieldLand: function(searchValue) {
        return axios({
            method: 'post',
            url: Url.getMsgContent,
            data: {
                "[]": {
                    "query": 2,
                    "ViewLand": {
                        "@column": "bid,introimg,geometry,names,landproperty,landstatus,jdname,orientation,area,unit,tel,contact2,unit2,tel2,contact2",
                        "@dataType": "ViewLand",
                        "names$": searchValue
                    }
                },
                "total@": "/[]/total",
                "format": true
            }
        })
    },

    /**
     * 头部搜索栏第一个产业园区
     * @param {搜索输入的条件} searchValue 
     */
    getSearchByFieldPark: function(searchValue) {
        return axios({
            method: 'post',
            url: Url.getMsgContent,
            data: {
                "[]": {
                    "query": 2,
                    "ViewParkBuild": {
                        "@column": "bid,introimg,geometry,names,parttype,partstatus,floorarea,buildarea,dormarea,vacantarea,linkman,tel",
                        "@dataType": "ViewParkBuild",
                        "names$": searchValue
                    }
                },
                "total@": "/[]/total",
                "format": true
            }
        })
    },

    /**
     * 头部搜索栏第一个工业区
     * @param {搜索输入的条件} searchValue 
     */
    getSearchByIndustrailPark: function(searchValue) {
        return axios({
            method: 'post',
            url: Url.getMsgContent,
            data: {
                "[]": {
                    "query": 2,
                    "ViewInd": {
                        "@column": "bid,transformway,jdname,geometrypoint,names,img,indbrief",
                        "jdcode{}": [
                            "440307001",
                            "440307002",
                            "440307003",
                            "440307004",
                            "440307005",
                            "440307006",
                            "440307007",
                            "440307008"
                        ],
                        "transformway{}": [
                            "维持现状",
                            "空地新建",
                            "产业置换",
                            "拆除重建",
                            "综合整治",
                            "逐步清退"
                        ],
                        "names$": searchValue
                    }
                },
                "total@": "/[]/total",
                "format": true
            }
        })
    },

    //租售搜索
    /**
     * 可售产业用地最初始数据值
     */
    getSearchListLandInforInit: function(name) {
        if(name === "") {    //可售产业用地最初始数据值  当输入信息为空时
            return axios({
                method: 'post',
                url: Url.getMsgContent,
                data: {
                    "[]": {
                        "query": 2,
                        "ViewLand": {
                            "@column": "geometry,x,y,bid,names,jdname,jdcode",
                            "landstatus{}": [
                                "待售"
                            ]
                        }
                    },
                    "total@": "/[]/total",
                    "format": true
                }
            })
        }else {    //可售产业用地最初始数据值  当输入信息不为空时
            return axios({
                method: 'post',
                url: Url.getMsgContent,
                data: {
                    "[]": {
                        "query": 2,
                        "ViewLand": {
                            "@column": "geometry,x,y,bid,names,jdname,jdcode",
                            "landstatus{}": [
                                "待售"
                            ],
                            "names$": name
                        }
                    },
                    "total@": "/[]/total",
                    "format": true
                }
            })
        }    
    },

    /**
     * 可售产业用地地图数据值  根据条件筛选
     * @param {输入框值} name 
     * @param {区域} jdcode 
     * @param {单价} referencepricemin 
     * @param {面积} area 
     */
    getSearchListLandFromCondition: function(name,jdcode,referencepricemin,area) {
        if(name === "") {    //可售产业用地最初始数据值  当输入信息为空时
            return axios({
                method: 'post',
                url: Url.getMsgContent,
                data: {
                    "[]": {
                        "query": 2,
                        "ViewLand": {
                            "@column": "geometry,x,y,bid,names,jdname,jdcode",
                            "landstatus{}": [
                                "待售"
                            ],
                            "jdcode{}": jdcode,
                            "referencepricemin&{}": referencepricemin,
                            "area&{}": area,
                        }
                    },
                    "total@": "/[]/total",
                    "format": true
                }
            })
        }else {    //可售产业用地最初始数据值  当输入信息不为空时
            return axios({
                method: 'post',
                url: Url.getMsgContent,
                data: {
                    "[]": {
                        "query": 2,
                        "ViewLand": {
                            "@column": "geometry,x,y,bid,names,jdname,jdcode",
                            "landstatus{}": [
                                "待售"
                            ],
                            "names$": name,
                            "jdcode{}": jdcode,
                            "referencepricemin&{}": referencepricemin,
                            "area&{}": area,
                        }
                    },
                    "total@": "/[]/total",
                    "format": true
                }
            })
        }    
    },

    /**
     * 可售产业用地最初始列表数据 分页查找
     * @param {分页} page 
     */
    getSearchMapListInfor: function(page,name,orderType) {
        if(name === "") {
            return axios({
                method: 'post',
                url: Url.getMsgContent,
                data: {
                    "[]": {
                        "query": 2,
                        "count": 10,
                        "page": page-1,
                        "ViewLand": {
                            "@column": "geometry,bid,area,jdname,names,address,landstatus,referenceprice,introimg,x,y",
                            "landstatus{}": [
                                "待售"
                            ],
                            "@order": orderType
                        }
                    },
                    "total@": "/[]/total",
                    "format": true
                }
            })
        }else{
            return axios({
                method: 'post',
                url: Url.getMsgContent,
                data: {
                    "[]": {
                        "query": 2,
                        "count": 10,
                        "page": page-1,
                        "ViewLand": {
                            "@column": "geometry,bid,area,jdname,names,address,landstatus,referenceprice,introimg,x,y",
                            "landstatus{}": [
                                "待售"
                            ],
                            "names$": name,
                        }
                    },
                    "total@": "/[]/total",
                    "format": true
                }
            })
        }   
    },

    /**
     * 根据条件查询可售产业用地  
     * @param {查询名称} name 
     * @param {区域} jdcode 
     * @param {单价} referencepricemin 
     * @param {面积} area 
     */
    getSearchMapListFromCondition: function(name,page,jdcode,referencepricemin,area,order) {
        if(name === "") {
            return axios({
                method: 'post',
                url: Url.getMsgContent,
                data: {
                    "[]": {
                        "query": 2,
                        "count": 10,
                        "page": page-1,
                        "ViewLand": {
                            "@column": "geometry,bid,area,introimg,jdname,names,address,landstatus,referenceprice,x,y",
                            "landstatus{}": [
                                "待售"
                            ],
                            "jdcode{}": jdcode,
                            "referencepricemin&{}": referencepricemin,
                            "area&{}": area,
                            "@order": order
                        }
                    },
                    "total@": "/[]/total",
                    "format": true
                }
            })
        }else {
            return axios({
                method: 'post',
                url: Url.getMsgContent,
                data: {
                    "[]": {
                        "query": 2,
                        "count": 10,
                        "page": page-1,
                        "ViewLand": {
                            "@column": "geometry,bid,area,introimg,jdname,names,address,landstatus,referenceprice,x,y",
                            "landstatus{}": [
                                "待售"
                            ],
                            "names$": name,
                            "jdcode{}": jdcode,
                            "referencepricemin&{}": referencepricemin,
                            "area&{}": area,
                            "@order": order
                        }
                    },
                    "total@": "/[]/total",
                    "format": true
                }
            })
        }
    },

    /**
     * 查询地图弹窗点数据 (可租产业用房)
     * @param {json参数} jsonData 
     */
    getSentHouseMark: function(jsonData) {
        return axios({
            method: 'post',
            url: Url.getMsgContent,
            data: {
                "[]": {
                    "query": 2,
                    "ViewRentalBuild": jsonData
                },
                "total@": "/[]/total",
                "format": true
            }
        })
    },

    /**
     * 查询可租产业用房列表数据
     * @param {分页} page 
     * @param {json参数} jsonData 
     */
    getSentHouseList: function(page,jsonData) {
        return axios({
            method: 'post',
            url: Url.getMsgContent,
            data: {
                "[]": {
                    "query": 2,
                    "count": 10,
                    "page": page-1,
                    "ViewRentalBuild": jsonData
                },
                "total@": "/[]/total",
                "format": true
            }
        })
    },

    getSentHouseMarkFromCondition: function(name,status,jdcode,referenceprice,area) {
        if(name !=="") {
            return axios({
                method: 'post',
                url: Url.getMsgContent,
                data: {
                    "[]": {
                        "query": 2,
                        "ViewRentalBuild": {
                            "@column": "geometry,parkid,area,names,btotal,introimg,x,y",
                            "landstatus$": status,
                            "names$": name,
                            "jdcode{}": jdcode,
                            "referencepricemin&{}": referenceprice,
                            "referencepricemax&{}": referenceprice,
                            "@combine": "referencepricemin&{},referencepricemax&{}",
                            "area&{}": area,
                            "@order": "names+"
                        },
                        "total@": "/[]/total",
                        "format": true
                    }
                }
            })
        }else{
            return axios({
                method: 'post',
                url: Url.getMsgContent,
                data: {
                    "[]": {
                        "query": 2,
                        "ViewRentalBuild": {
                            "@column": "geometry,parkid,area,names,btotal,introimg,x,y",
                            "landstatus$": status,
                            "jdcode{}": jdcode,
                            "referencepricemin&{}": referenceprice,
                            "referencepricemax&{}": referenceprice,
                            "@combine": "referencepricemin&{},referencepricemax&{}",
                            "area&{}": area,
                            "@order": "names+"
                        }
                    },
                    "total@": "/[]/total",
                    "format": true
                }
            })
        }
    },

    /**
     * 根据筛选条件加载可租产业用房弹窗
     * @param {*} jsonData 
     */
    getSentHouseMarkFromCondition_1: function(jsonData) {
        return axios({
            method: 'post',
            url: Url.getMsgContent,
            data: {
                "[]": {
                    "query": 2,
                    "ViewRentalBuild": jsonData
                },
                "total@": "/[]/total",
                "format": true
            }
        })
    },

    /**
     * 查询地图弹窗点数据 (可售产业用房)
     * @param {json参数} jsonData 
     */
    getSaleHouseMark: function(jsonData) {
        return axios({
            method: 'post',
            url: Url.getMsgContent,
            data: {
                "[]": {
                    "query": 2,
                    "ViewCellBuild": jsonData
                },
                "total@": "/[]/total",
                "format": true
            }
        })
    },

    /**
     * 查询可售产业用房列表数据
     * @param {分页} page 
     * @param {json参数} jsonData 
     */
    getSaleHouseList: function(page,jsonData) {
        return axios({
            method: 'post',
            url: Url.getMsgContent,
            data: {
                "[]": {
                    "query": 2,
                    "count": 10,
                    "page": page-1,
                    "ViewCellBuild": jsonData
                },
                "total@": "/[]/total",
                "format": true
            }
        })
    },

    /**
     * 根据筛选条件加载可售产业用房弹窗
     * @param {*} jsonData 
     */
    getSaleHouseMarkFromCondition: function(jsonData) {
        return axios({
            method: 'post',
            url: Url.getMsgContent,
            data: {
                "[]": {
                    "query": 2,
                    "ViewCellBuild": jsonData
                },
                "total@": "/[]/total",
                "format": true
            }
        })
    },

    /**
     * 点击可售产业用地弹窗更新相应列表数据
     * @param {*} page 
     * @param {*} parkid 
     */
    clickPopDisplayLandList: function(page,jdcode,orderType) {
        return axios({
            method: 'post',
            url: Url.getMsgContent,
            data: {
                "[]": {
                    "query": 2,
                    "count": 10,
                    "page": page-1,
                    "ViewLand": {
                        "@column": "geometry,bid,area,jdname,names,address,landstatus,referenceprice,introimg,x,y",
                        "landstatus{}": [
                            "待售"
                        ],
                        "jdcode": jdcode,
                        "@order": orderType
                    }
                },
                "total@": "/[]/total",
                "format": true
            }
        })
    },

    /**
     * 点击可租产业用房弹窗更新相应列表数据
     * @param {*} page 
     * @param {*} parkid 
     */
    clickPopDisplayList: function(page,parkid,order) {
        return axios({
            method: 'post',
            url: Url.getMsgContent,
            data: {
                "[]": {
                    "query": 2,
                    "count": 10,
                    "page": page-1,
                    "ViewRentalBuild": {
                        "@column": "geometry,buildid,parkid,area,names,introimg,bname,btotal,address,landstatus,referenceprice,x,y",
                        "parkid": parkid,
                        "@order": order
                    }
                },
                "total@": "/[]/total",
                "format": true
            }
        })
    },

    /**
     * 点击可售产业用房弹窗更新相应列表数据
     * @param {*} page 
     * @param {*} parkid 
     */
    clickSalePopDisplayList: function(page,parkid,order) {
        return axios({
            method: 'post',
            url: Url.getMsgContent,
            data: {
                "[]": {
                    "query": 2,
                    "count": 10,
                    "page": page-1,
                    "ViewCellBuild": {
                        "@column": "geometry,buildid,parkid,area,names,bname,btotal,address,landstatus,referenceprice,x,y",
                        "parkid": parkid,
                        "@order": order
                    }
                },
                "total@": "/[]/total",
                "format": true
            }
        })
    },

    /**
     * 楼栋详情
     * @param {楼栋id} bid 
     */
    getBuildingDetail: function(bid) {
        return axios({
            method: 'post',
            url: Url.getMsgContent,
            data: {
                "[]": {
                    "ViewBuilding": {
                        "@column": "bid,pid,introimg,bname,area,rental,use,names,price,contact,tel,buildhigh,belevator,forindustry,electricity",
                        "bid": bid
                    }
                },
                "total@": "/[]/total",
                "format": true
            }
        })
    },

    //切换到列表
    /**
     * 可售产业用地列表数据
     * @param {分页} page 
     * @param {json参数} jsonData 
     */
    getSsListSaleLand: function(page,jsonData) {   
        return axios({
            method: 'post',
            url: Url.getMsgContent,
            data: {
                "[]": {
                    "query": 2,
                    "count": 10,
                    "page": page-1,
                    "ViewLand": jsonData
                },
                "total@": "/[]/total",
                "format": true
            }
        })
    },

    /**
     * 可租产业用房列表数据
     * @param {分页} page 
     * @param {json参数} jsonData 
     */
    getSsListSentHouse: function(page,jsonData) {
        return axios({
            method: 'post',
            url: Url.getMsgContent,
            data: {
                "[]": {
                    "query": 2,
                    "count": 10,
                    "page": page-1,
                    "ViewRentalBuild": jsonData
                },
                "total@": "/[]/total",
                "format": true
            }
        })
    },

    /**
     * 可售产业用房列表数据
     * @param {分页} page 
     * @param {json参数} jsonData 
     */
    getSsListSaleHouse: function(page,jsonData) {
        return axios({
            method: 'post',
            url: Url.getMsgContent,
            data: {
                "[]": {
                    "query": 2,
                    "count": 10,
                    "page": page-1,
                    "ViewCellBuild": jsonData
                },
                "total@": "/[]/total",
                "format": true
            }
        })
    },

    /**
     * 可售产业用地热门项目
     * @param {分页} page 
     */
    getSsSentLandHotProgram: function(page) {
        return axios({
            method: 'post',
            url: Url.getMsgContent,
            data: {
                "[]": {
                    "query": 2,
                    "count": 6,
                    "page": page-1,
                    "TsupLand": {
                        "@column": "bid,jdname,names",
                        "publishstatus": 1,
                        "ispromotion": "是"
                    }
                },
                "total@": "/[]/total",
                "format": true
            }
        })
    },

    /**
     * 可租产业用房热门项目
     * @param {分页} page 
     */
    getSsSentHouseHotProgram: function(page) {
        return axios({
            method: 'post',
            url: Url.getMsgContent,
            data: {
                "[]": {
                    "query": 2,
                    "count": 6,
                    "page": page-1,
                    "TsupPark": {
                        "@column": "bid,jdname,names",
                        "partsstatus$": [
                            "%待租%",
                            "%在租%",
                            "%租完%"
                        ],
                        "publishstatus": 1,
                        "ispromotion": "是"
                    }
                },
                "total@": "/[]/total",
                "format": true
            }
        })
    },

    /**
     * 可售产业用房热门项目
     * @param {分页} page 
     */
    getSsSaleHouseHotProgram: function(page) {
        return axios({
            method: 'post',
            url: Url.getMsgContent,
            data: {
                "[]": {
                    "query": 2,
                    "count": 10,
                    "page": page-1,
                    "TsupPark": {
                        "@column": "bid,jdname,names",
                        "partsstatus$": [
                            "%待售%",
                            "%在售%",
                            "%售完%"
                        ],
                        "publishstatus": 1,
                        "ispromotion": "是"
                    }
                },
                "total@": "/[]/total",
                "format": true
            }
        })
    },

    /**
     * 可售产业用地查看地图
     * @param {地块bid} bid 
     */
    getSaleLandMapMark: function(bid) {
        return axios({
            method: 'post',
            url: Url.getMsgContent,
            data: {
                "[]": {
                    "query": 2,
                    "ViewLand": {
                        "@column": "geometry,geometrypoly,bid,introimg,area,jdname,names,address,landstatus,referenceprice,x,y",
                        "bid": bid
                    }
                },
                "total@": "/[]/total",
                "format": true
            }
        })
    },

    /**
     * 可租产业用房查看地图
     * @param {楼栋buildid} bid 
     */
    getSentHouseMapMark: function(bid){
        return axios({
            method: 'post',
            url: Url.getMsgContent,
            data: {
                "[]": {
                    "query": 2,
                    "ViewRentalBuild": {
                        "@column": "geometry,geometrypoly,buildid,parkid,area,names,bname,btotal,address,landstatus,referenceprice,x,y",
                        "buildid": bid
                    }
                },
                "total@": "/[]/total",
                "format": true
            }
        })
    },

    /**
     * 可售产业用房查看地图
     * @param {楼栋buildid} bid 
     */
    getSaleHouseMapMark: function(bid) {
        return axios({
            method: 'post',
            url: Url.getMsgContent,
            data: {
                "[]": {
                    "query": 2,
                    "ViewCellBuild": {
                        "@column": "geometry,geometrypoly,buildid,parkid,area,names,bname,btotal,address,landstatus,referenceprice,x,y",
                        "buildid": bid
                    }
                },
                "total@": "/[]/total",
                "format": true
            }
        })
    },

    //投资意向登记
    /**
     * 获取所属行业
     */
    getBelongTrade: function() {
        return axios({
            method: 'post',
            url: Url.getMsgContent,
            data: {
                "[]": {
                    "query": 2,
                    "ViewIndustryType": {}
                },
                "total@": "/[]/total",
                "format": true
            }
        })
    },
    
    /**
     * 提交投资意向登记表单
     * @param {表单数据} jsonData 
     */
    submitInvestTable: function(jsonData) {
        return axios({
            method: 'post',
            url: Url.submitInTrade,
            data: jsonData
        })
    }

}

export { base_url }