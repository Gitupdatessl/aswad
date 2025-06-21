/** @odoo-module */

import { Component, onMounted, useState } from "@odoo/owl";
import { usePos } from "@point_of_sale/app/store/pos_hook";

/**
 * Waitress Manager Component
 * Provides UI to manage waitress assignments for tables
 */
export class WaitressManager extends Component {
    static template = "pos_restaurant_custom.WaitressManager";
    
    setup() {
        this.pos = usePos();
        this.state = useState({
            visible: true,
            waitresses: ['Sarah', 'Emma', 'Lisa', 'Anna', 'Maria', 'Sophie', 'Julia']
        });
        
        onMounted(() => {
            console.log("🔍 POS RESTAURANT CUSTOM: WaitressManager mounted");
        });
    }
    
    togglePanel() {
        this.state.visible = !this.state.visible;
    }
    
    autoAssignWaitresses() {
        console.log("🤖 POS RESTAURANT CUSTOM: Auto-assigning waitresses");
        
        // Find all tables
        const tables = document.querySelectorAll('.table');
        let assigned = 0;
        
        tables.forEach((table, index) => {
            const label = table.querySelector('.waitress-label');
            if (label && label.textContent === 'Unassigned') {
                const waitressIndex = index % this.state.waitresses.length;
                label.textContent = this.state.waitresses[waitressIndex];
                label.style.background = '#10b981';
                label.className = 'waitress-label assigned';
                assigned++;
            }
        });
        
        // Update table data in POS
        if (this.pos && this.pos.tables) {
            this.pos.tables.forEach(table => {
                const tableEl = document.querySelector(`.table[data-id="${table.id}"]`);
                if (tableEl) {
                    const label = tableEl.querySelector('.waitress-label');
                    if (label && label.textContent !== 'Unassigned') {
                        table.waitress = label.textContent;
                    }
                }
            });
        }
        
        alert(`Auto-assigned ${assigned} tables!`);
    }
    
    clearAllWaitresses() {
        console.log("🧹 POS RESTAURANT CUSTOM: Clearing all waitress assignments");
        
        // Find all tables
        const tables = document.querySelectorAll('.table');
        let cleared = 0;
        
        tables.forEach(table => {
            const label = table.querySelector('.waitress-label');
            if (label && label.textContent !== 'Unassigned') {
                label.textContent = 'Unassigned';
                label.style.background = '#ef4444';
                label.className = 'waitress-label unassigned';
                cleared++;
            }
        });
        
        // Update table data in POS
        if (this.pos && this.pos.tables) {
            this.pos.tables.forEach(table => {
                table.waitress = null;
            });
        }
        
        alert(`Cleared ${cleared} waitress assignments!`);
    }
    
    refreshLabels() {
        console.log("🔄 POS RESTAURANT CUSTOM: Refreshing waitress labels");
        
        // Find all tables
        const tables = document.querySelectorAll('.table');
        let added = 0;
        
        tables.forEach(table => {
            if (!table.querySelector('.waitress-label')) {
                // Create waitress label
                const label = document.createElement('div');
                label.className = 'waitress-label unassigned';
                label.textContent = 'Unassigned';
                
                // Ensure table has relative positioning
                if (getComputedStyle(table).position === 'static') {
                    table.style.position = 'relative';
                }
                
                // Add the label
                table.appendChild(label);
                added++;
            }
        });
        
        alert(`Refreshed labels! Added ${added} new labels.`);
    }
} 