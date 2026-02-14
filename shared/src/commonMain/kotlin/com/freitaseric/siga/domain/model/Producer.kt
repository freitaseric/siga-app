package com.freitaseric.siga.domain.model

data class Producer(
    val id: Long? = null,
    val name: String,
    val cpf: String,
    val caf: String?,
    val address: String,
)
