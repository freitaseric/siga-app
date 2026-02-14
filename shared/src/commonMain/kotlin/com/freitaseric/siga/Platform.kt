package com.freitaseric.siga

interface Platform {
    val name: String
}

expect fun getPlatform(): Platform