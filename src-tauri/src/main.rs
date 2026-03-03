// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct LyricsRequest {
    event_type: String,
    subject: String,
    style: String,
    language: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct LyricsResponse {
    style: String,
    lyrics: String,
}

#[tauri::command]
async fn generate_lyrics(request: LyricsRequest) -> Result<LyricsResponse, String> {
    // This will be called from the frontend
    // The actual API call remains in the frontend for now
    // This command can be used for server-side generation in the future
    Ok(LyricsResponse {
        style: request.style,
        lyrics: String::from("Lyrics generated successfully!"),
    })
}

#[tauri::command]
fn get_app_version() -> String {
    env!("CARGO_PKG_VERSION").to_string()
}

#[tauri::command]
fn log_message(message: String) {
    println!("[Hymne App] {}", message);
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_store::Builder::default().build())
        .invoke_handler(tauri::generate_handler![
            generate_lyrics,
            get_app_version,
            log_message
        ])
        .setup(|_app| {
            // Log app start
            println!("L'Hymne application started");
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running L'Hymne application");
}
