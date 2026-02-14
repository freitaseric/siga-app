package com.freitaseric.siga.domain.model

import com.freitaseric.siga.db.SelectAllReportsFull

data class FieldReport(
    val id: Long? = null,
    val producerId: Long,
    val producerName: String,
    val services: List<Service>,
    val serviceNames: String? = null,
    val areaWorked: Double?,
    val cropInfo: String,
    val latitude: Double?,
    val longitude: Double?,
    val photos: List<String>,
    val observations: String,
    val createdAt: Long
) {
    companion object {
        fun fromSql(entity: SelectAllReportsFull) = FieldReport(
            id = entity.id,
            producerId = entity.producerId,
            producerName = entity.producerName,
            services = emptyList(),
            serviceNames = entity.serviceNames,
            areaWorked = entity.areaWorked,
            cropInfo = entity.cropInfo,
            latitude = entity.latitude,
            longitude = entity.longitude,
            photos = entity.allPhotos.split("|") ?: emptyList(),
            observations = entity.observations,
            createdAt = entity.createdAt
        )
    }
}
