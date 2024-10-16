import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeVideo from '@/views/HomeVideo'
import HomeShopping from '@/views/HomeShopping'
import HomeMy from '@/views/HomeMy'
import HomeGuide from '@/views/HomeGuide'
import PokemonCard from '@/components/PokemonCard'
import MyFairy from '@/views/MyFairy'
import AttributeRestraint from '@/views/AttributeRestraint'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', component: HomeVideo },
    { path: '/shopping', component: HomeShopping },
    { path: '/my', component: HomeMy },
    { path: '/guide', component: HomeGuide },
    { path: '/fairy', component: MyFairy },
    { path: '/kezhi', component: AttributeRestraint },
    { path: '/:id', component: PokemonCard }
  ]
})

export default router
