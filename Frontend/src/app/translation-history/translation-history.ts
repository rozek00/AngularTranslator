import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HistoryService, HistoryEntry, SortOrder } from '../history.service';

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

  currentSortOrder: SortOrder = 1;

  editingId: number | null = null;
  editOriginal = '';
  editTranslated = '';

  constructor(private historyService: HistoryService,private route: ActivatedRoute,private router: Router) {}

  ngOnInit() {
    this.route.params
    .subscribe(params => {
    const sortParam = params['sortOrder'];
    if (sortParam === '0' || sortParam === '1') {
      this.currentSortOrder = parseInt(sortParam, 10) as SortOrder;
    } else {
      this.currentSortOrder = 1;
      this.router.navigate(['/history/1'], { replaceUrl: true });
      return;
    }
    this.loadHistory();
    });
  }

  loadHistory() {
    this.loading = true;
    this.historyService.getHistory(this.currentSortOrder).subscribe({
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

  setSortOrder(order: SortOrder) {
    if (order !== this.currentSortOrder) {
      this.router.navigate(['/history', order]);
    }
  }

  get sortOrderLabel(): string {
    return this.currentSortOrder === 1 ? 'Najnowsze' : 'Najstarsze';
  }

  deleteEntry(id: number) {
    this.historyService.deleteEntry(id).subscribe({
      next: () => {
        this.history = this.history.filter(h => h._id !== id);
      },
      error: (err) => console.error('Błąd przy usuwaniu:', err)
    });
  }

  clearAll() {
    if (!confirm('Usunąć całą historię?')) return;
    this.historyService.clearHistory().subscribe({
      next: () => this.history = [],
      error: (err) => console.error('Błąd przy czyszczeniu historii:', err)
    });
  }

  formatDate(date: string | Date): string {
    const d = date instanceof Date ? date : new Date(date);
    return d.toLocaleString('pl-PL');
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
        if (index !== -1) this.history[index] = updated;
        this.editingId = null;
      },
      error: (err) => console.error('Błąd przy edycji:', err)
    });
  }
}
