/** @odoo-module */

console.log("🔄 POS RESTAURANT CUSTOM: Direct injection loading");

// Direct DOM injection as fallback
setTimeout(() => {
    console.log("🔍 POS RESTAURANT CUSTOM: Checking for tables via DOM");
    
    const tables = document.querySelectorAll('div.table.position-absolute');
    if (tables.length > 0) {
        console.log(`✅ POS RESTAURANT CUSTOM: Found ${tables.length} tables via DOM`);
        
        // Add labels to tables
        tables.forEach((table, index) => {
            if (!table.querySelector('.waitress-label')) {
                // Create waitress label
                const label = document.createElement('div');
                label.className = 'waitress-label unassigned';
                label.textContent = 'Unassigned';
                
                // Ensure table has relative positioning
                if (getComputedStyle(table).position === 'static') {
                    table.style.position = 'relative';
                }
                
                // Add click handler
                label.addEventListener('click', (e) => {
                    e.stopPropagation();
                    
                    const waitresses = ['Sarah', 'Emma', 'Lisa', 'Anna', 'Maria', 'Sophie', 'Julia'];
                    const currentWaitress = label.textContent;
                    
                    // Show selection dialog
                    const selection = prompt(
                        `Assign waitress to Table ${index + 1}:\n\n` +
                        `Currently: ${currentWaitress}\n` +
                        `Available: ${waitresses.join(', ')}\n\n` +
                        `Enter name or leave empty to unassign:`,
                        currentWaitress === 'Unassigned' ? '' : currentWaitress
                    );
                    
                    if (selection !== null) {
                        if (selection.trim() === '') {
                            label.textContent = 'Unassigned';
                            label.className = 'waitress-label unassigned';
                        } else {
                            label.textContent = selection.trim();
                            label.className = 'waitress-label assigned';
                        }
                    }
                });
                
                // Add the label
                table.appendChild(label);
            }
        });
        
        // Add manager panel if not exists
        if (!document.querySelector('.waitress-manager-panel')) {
            const panel = document.createElement('div');
            panel.className = 'waitress-manager-panel';
            panel.innerHTML = `
                <div class="waitress-manager-toggle">◀</div>
                <h3>🍽️ Waitress Manager</h3>
                <button id="auto-assign-btn">Auto-Assign Waitresses</button>
                <button id="clear-all-btn">Clear All Assignments</button>
                <button id="refresh-labels-btn">Refresh Labels</button>
            `;
            document.body.appendChild(panel);
            
            // Add toggle functionality
            panel.querySelector('.waitress-manager-toggle').addEventListener('click', () => {
                panel.classList.toggle('collapsed');
                const toggle = panel.querySelector('.waitress-manager-toggle');
                toggle.textContent = panel.classList.contains('collapsed') ? '▶' : '◀';
            });
            
            // Add button handlers
            panel.querySelector('#auto-assign-btn').addEventListener('click', () => {
                const waitresses = ['Sarah', 'Emma', 'Lisa', 'Anna', 'Maria', 'Sophie', 'Julia'];
                const labels = document.querySelectorAll('.waitress-label.unassigned');
                let assigned = 0;
                
                labels.forEach((label, index) => {
                    const waitressIndex = index % waitresses.length;
                    label.textContent = waitresses[waitressIndex];
                    label.className = 'waitress-label assigned';
                    assigned++;
                });
                
                alert(`Auto-assigned ${assigned} tables!`);
            });
            
            panel.querySelector('#clear-all-btn').addEventListener('click', () => {
                const labels = document.querySelectorAll('.waitress-label.assigned');
                let cleared = 0;
                
                labels.forEach(label => {
                    label.textContent = 'Unassigned';
                    label.className = 'waitress-label unassigned';
                    cleared++;
                });
                
                alert(`Cleared ${cleared} waitress assignments!`);
            });
            
            panel.querySelector('#refresh-labels-btn').addEventListener('click', () => {
                window.location.reload();
            });
        }
    }
}, 2000);

// Try again after 5 seconds as a last resort
setTimeout(() => {
    const tables = document.querySelectorAll('div.table');
    if (tables.length > 0 && !document.querySelector('.waitress-label')) {
        console.log(`🔄 POS RESTAURANT CUSTOM: Last resort injection for ${tables.length} tables`);
        
        // Add a notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: #3b82f6;
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            z-index: 9999;
            font-weight: bold;
        `;
        notification.textContent = 'Click here to inject waitress labels';
        notification.addEventListener('click', () => {
            // Reload the page with a special parameter
            window.location.href = window.location.href + (window.location.href.includes('?') ? '&' : '?') + 'inject_waitress=1';
        });
        document.body.appendChild(notification);
    }
}, 5000);

console.log("✅ POS RESTAURANT CUSTOM: Direct injection ready"); 