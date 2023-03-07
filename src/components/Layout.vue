<script setup>
import { RouterLink } from 'vue-router'
import { NIcon, zhCN, dateZhCN } from 'naive-ui'
import {
    Home16Regular as HomeIcon,
    CalendarPerson24Regular as CalendarPersonIcon,
    PersonCircle24Regular as PersonIcon,
} from '@vicons/fluent'

function renderIcon(icon) {
    return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions = [
    {
        label: () =>
            h(
                RouterLink,
                {
                    to: {
                        name: 'home',
                    },
                },
                { default: () => '首页' }
            ),
        key: 'home',
        icon: renderIcon(HomeIcon),
    },
    {
        label: () =>
            h(
                RouterLink,
                {
                    to: {
                        name: 'member',
                    },
                },
                { default: () => '人员' }
            ),
        key: 'member',
        icon: renderIcon(PersonIcon),
    },
    {
        label: () =>
            h(
                RouterLink,
                {
                    to: {
                        name: 'schedual',
                    },
                },
                { default: () => '排班' }
            ),
        key: 'schedual',
        icon: renderIcon(CalendarPersonIcon),
    },
]
</script>

<template>
    <n-config-provider :locale="zhCN" :date-locale="dateZhCN">
        <n-layout has-sider>
            <n-layout-sider collapse-mode="transform" :collapsed-width="120" :width="240" show-trigger="bar"
                content-style="padding: 24px;" bordered>
                <n-menu :collapsed-width="64" :collapsed-icon-size="22" :options="menuOptions" />
            </n-layout-sider>
            <n-layout-content content-style="padding: 24px;">
                <router-view />
            </n-layout-content>
        </n-layout>
    </n-config-provider>
</template>
