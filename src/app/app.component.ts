import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  inputText = '';
  agents = ["Gina Williams", "Jake Williams", "Jamie John", "John Doe", "Jeff Stewart", "Paula M. Keith"];
  showDropdown = false;
  matchingAgents: string[] = [];
  activeIndex = -1;
  inputValue: string = '';

  onInputChange(event: any) {
    const inputValue = event.target.value;
    const lastIndex = inputValue.lastIndexOf('@');
    if (lastIndex !== -1) {
      this.showDropdown = true;
      const searchText = inputValue.substring(lastIndex + 1, inputValue.length);
      this.matchingAgents = this.agents.filter(agent => agent.toLowerCase().includes(searchText.toLowerCase()));
      this.activeIndex = -1;
    } else {
      this.showDropdown = false;
      this.matchingAgents = [];
    }
  }

  onSelect(agent: string) {
    const inputValue = this.inputText;
    const lastIndex = inputValue.lastIndexOf('@');
    this.inputText = inputValue.substring(0, lastIndex + 1) + agent;
    this.showDropdown = false;
    this.matchingAgents = [];
    this.activeIndex = -1;
  }

  onKeyDown(event: any) {
    if (this.showDropdown) {
      if (event.key === 'ArrowUp') {
        this.activeIndex = this.activeIndex > 0 ? this.activeIndex - 1 : this.matchingAgents.length - 1;
        event.preventDefault();
      } else if (event.key === 'ArrowDown') {
        this.activeIndex = (this.activeIndex + 1) % this.matchingAgents.length;
        event.preventDefault();
      } else if (event.key === 'Enter' && this.activeIndex !== -1) {
        const agent = this.matchingAgents[this.activeIndex];
        this.onSelect(agent);
        event.preventDefault();
      }
    }
  }
  
  clearInput() {
    this.inputValue = '';
    this.matchingAgents = [];
    this.activeIndex = -1;
  }
}

