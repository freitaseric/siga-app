package com.freitaseric.siga.domain.model

import com.freitaseric.siga.db.ServiceEntity

data class Service(
    val id: Long? = null,
    val name: String,
    val category: ServiceCategory,
) {
    companion object {
        fun fromSql(entity: ServiceEntity) = Service(id = entity.id, name = entity.name, category = entity.category)
    }
}

enum class ServiceCategory {
    MACHINERY, TECHNICAL_ASSISTANCE
}