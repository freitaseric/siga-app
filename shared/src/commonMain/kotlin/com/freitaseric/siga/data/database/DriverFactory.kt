package com.freitaseric.siga.data.database

import app.cash.sqldelight.db.SqlDriver
import com.freitaseric.siga.data.repository.ReportRepository
import com.freitaseric.siga.db.AppDatabase
import com.freitaseric.siga.db.ServiceEntity

expect class DriverFactory {
    fun createDriver(): SqlDriver
}

fun createDatabase(driverFactory: DriverFactory): AppDatabase {
    val driver = driverFactory.createDriver()
    return AppDatabase(driver, ServiceEntity.Adapter(categoryAdapter = ReportRepository.serviceCategoryAdapter))
}
