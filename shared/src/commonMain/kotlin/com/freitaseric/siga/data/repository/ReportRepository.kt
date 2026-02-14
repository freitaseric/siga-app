package com.freitaseric.siga.data.repository

import app.cash.sqldelight.ColumnAdapter
import com.freitaseric.siga.db.AppDatabase
import com.freitaseric.siga.domain.model.FieldReport
import com.freitaseric.siga.domain.model.ServiceCategory

class ReportRepository(database: AppDatabase) {
    private val queries = database.appDatabaseQueries

    companion object {
        val serviceCategoryAdapter = object : ColumnAdapter<ServiceCategory, String> {
            override fun decode(databaseValue: String): ServiceCategory = ServiceCategory.valueOf(databaseValue)
            override fun encode(value: ServiceCategory): String = value.name
        }
    }

    fun saveReport(report: FieldReport) {
        queries.transaction {
            queries.insertReport(
                producerId = report.producerId,
                areaWorked = report.areaWorked,
                cropInfo = report.cropInfo,
                latitude = report.latitude,
                longitude = report.longitude,
                observations = report.observations,
                createdAt = report.createdAt
            )

            val reportId = queries.lastInsertId().executeAsOne()

            report.photos.forEach { path ->
                queries.insertReportPhoto(reportId, path)
            }

            report.services.forEach { service ->
                service.id?.let { serviceId ->
                    queries.insertReportService(reportId, serviceId)
                }
            }
        }
    }

    fun getAllReports(): List<FieldReport> {
        return queries.selectAllReportsFull().executeAsList().map(FieldReport::fromSql)
    }
}