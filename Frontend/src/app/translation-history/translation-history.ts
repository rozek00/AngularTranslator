import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HistoryService, HistoryEntry } from '../history.service';

@Component({
  selector: 'app-translation-history',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './translation-history.html',
  styleUrls: ['./translation-history.css']
})
export class TranslationHistory implements OnInit {
  history: HistoryEntry[] = [];
  loading = false;
  error = '';

  editingId: string | null = null;
  editOriginal = '';
  editTranslated = '';
  constructor(private historyService: HistoryService) {}

  ngOnInit() {
    this.loadHistory();
  }

  loadHistory() {
    this.loading = true;
    this.historyService.getHistory().subscribe({
      next: (data) => {
        this.history = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Nie udało się pobrać historii';
        this.loading = false;
      }
    });
  }

  deleteEntry(id: string) {
    this.historyService.deleteEntry(id).subscribe({
      next: () => {
        this.history = this.history.filter(h => h._id !== id);
      }
    });
  }

  clearAll() {
    if (!confirm('Usunąć całą historię?')) return;
    this.historyService.clearHistory().subscribe({
      next: () => this.history = []
    });
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleString('pl-PL');
  }

  startEdit(entry: HistoryEntry) {
    this.editingId = entry._id;
    this.editOriginal = entry.originalText;
    this.editTranslated = entry.translatedText;
  }

  cancelEdit() {
    this.editingId = null;
  }

  saveEdit(entry: HistoryEntry) {
    this.historyService.updateEntry(
      entry._id,
      this.editOriginal,
      this.editTranslated,
      entry.targetLang
    ).subscribe({
      next: (updated) => {
        const index = this.history.findIndex(h => h._id === entry._id);
        this.history[index] = updated;
        this.editingId = null;
      }
    });
  }
}