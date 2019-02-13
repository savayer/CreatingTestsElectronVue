<template>
    <div class="wrapper">
        <header class="header">
            <div class="item power">
                <img src="../assets/power.png" class="img" @click="closeWindow()">
            </div>
            <div class="item profile">
                <span>
                שלום שלמה הפטקר
                </span>
                <span>
                <img src="../assets/profile.png">          
                </span>
            </div>
            <div class="item menu">
                <ul>
                <li>
                    <router-link to="/">
                    עריכה
                    </router-link>
                </li>
                <li class="active">
                    <router-link to="/history">
                    היסטוריית מבחנים
                    </router-link>
                </li>
                </ul>
            </div>
            <div class="item logo">
                <img src="../assets/logo.png" class="logo" alt="">
            </div>
        </header>
        <div class="container top30">
            <h2 class="text-center">היסטוריית מבחנים</h2>

            <table class="table top30 table-striped table-bordered">
                <thead>
                    <th>מס’</th>
                    <th>תאריך</th>
                    <th>שם מבחן</th>
                    <th>פעולות</th>
                </thead>
                <tbody>

                </tbody>
            </table>
        </div>
    </div>
</template>
