import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import KeyAreaDetails from '@/view/keyareadetail'
import LandDetails from '@/view/landdetails'
import UseroomDetails from '@/view/useroomdetails'
import SearchMap from '@/view/searchmap'
import SwitchMap from '@/view/mapandlist/switchmap'
import SwitchList from '@/view/mapandlist/switchlist'
import CreateGuestInfor from '@/view/createguestinfor'
import Industrailparkdetail from '@/view/industrailparkdetail'
import EnterpriseDetail from '@/view/enterprisedetail'
import BuildingDetail from '@/view/buildingdetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/keyareadetails',
      name: 'keyareadetails',
      component: KeyAreaDetails,
      meta: {
          title: '重点片区详情'
      } 
    },
    {
      path: '/landdetails',
      name: 'landdetails',
      component: LandDetails,
      meta: {
        title: '用地详情'
      }  
    },
    {
      path: '/useroomdetails',
      name: 'useroomdetails',
      component: UseroomDetails,
      meta: {
        title: '园区详情'
      }  
    },
    {
        path: '/createguestinfor',
        name: 'createguestinfor',
        component: CreateGuestInfor,
        meta: {
          title: '创客园区详情'
        }  
    },
    {
        path: '/industrailparkdetail',
        name: 'industrailparkdetail',
        component: Industrailparkdetail,
        meta: {
          title: '工业区详情'
        }  
    },
    {
        path: '/enterprisedetail',
        name: 'enterprisedetail',
        component: EnterpriseDetail,
        meta: {
          title: '企业详情'
        } 
    },
    {
        path: '/buildingdetail',
        name: 'buildingdetail',
        component: BuildingDetail,
        meta: {
          title: '楼栋详情'
        } 
    },
    {
      path: '/searchmap',
      name: 'searchmap',
      component: SearchMap,
      redirect: '/searchmap/switchmap',
      children: [{
          path: '/searchmap/switchmap',
          name: 'switchmap',
          component: SwitchMap,
          meta: {
            title: '租售搜索地图'
          }
      },{
          path: '/searchmap/switchlist',
          name: 'switchlist',
          component: SwitchList,
          meta: {
            title: '租售搜索列表'
          }
      }]
    }
  ]
})
