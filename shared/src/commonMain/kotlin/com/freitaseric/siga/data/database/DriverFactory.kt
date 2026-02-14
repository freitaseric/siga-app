package com.freitaseric.siga.data.database

import app.cash.sqldelight.db.SqlDriver
import com.freitaseric.siga.db.AppDatabase

expect class DriverFactory {
    fun createDriver(): SqlDriver
}

fun createDatabase(driverFactory: DriverFactory): AppDatabase {
    val driver = driverFactory.createDriver()
    return AppDatabase(driver)
}
