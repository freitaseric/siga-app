import SwiftUI
import shared

struct HomeView: View {
    var body: some View {
        NavigationStack {
            ZStack {
                AppBackground()
                
                ScrollView {
                    VStack(spacing: 20) {
                        GlassCard {
                            VStack(alignment: .leading) {
                                Text("Relatório de Campo")
                                    .font(.headline)
                                Text("Vila Central - Cantá")
                                    .font(.subheadline)
                                    .foregroundColor(.secondary)
                            }
                            .frame(maxWidth: .infinity, alignment: .leading)
                        }
                    }
                    .padding()
                }
                .navigationTitle("SEDAG")
            }
        }
    }
}