const express = require('express');
const router = express.Router();
const dns = require('dns');
const { Resolver } = dns;
const dnsPromises = dns.promises;

// List of public resolvers
const PROBES = [
    { id: 'local', provider: "System Default", ip: "Local", location: "Server Location", country: "US" }, // Will use system resolver
    { id: 1, provider: "Google", ip: "8.8.8.8", location: "Mountain View, CA, United States", country: "US" },
    { id: 2, provider: "Cloudflare", ip: "1.1.1.1", location: "Sydney, Australia", country: "AU" },
    { id: 3, provider: "OpenDNS", ip: "208.67.222.222", location: "San Francisco, CA, United States", country: "US" },
    { id: 4, provider: "Quad9", ip: "9.9.9.9", location: "Berkeley, CA, United States", country: "US" },
    { id: 5, provider: "Verisign", ip: "64.6.64.6", location: "Sterling, VA, United States", country: "US" },
];

router.post('/dns-lookup', async (req, res) => {
    const { domain, type = 'A' } = req.body;

    if (!domain) {
        return res.status(400).json({ message: 'Domain is required' });
    }

    try {
        const queryType = type === 'ALL' ? 'A' : type;

        const promises = PROBES.map(async (probe) => {
            const start = Date.now();
            try {
                let records;

                // Use system resolver for 'local', custom for others
                if (probe.id === 'local') {
                    records = await dnsPromises.resolve(domain, queryType);
                } else {
                    const resolver = new Resolver();
                    resolver.setServers([probe.ip]);
                    // Wrap resolver.resolve in a promise since basic Resolver is callback-based in some Node versions,
                    // but modern Node has resolve() returning promise if we use promises API? No, Resolver class allows async?
                    // Actually, 'new Resolver()' creates an instance with callback methods. 
                    // We should use 'resolve' method carefully.
                    // Node 18+: 'const { Resolver } = require('dns').promises;' IS valid and has async methods.
                    // To be safe and compatible: wrap in Promise if needed. 
                    // But simpler: just use dns.promises.Resolver if available. 

                    // Let's stick to wrapping the callback-based Resolver for maximum compatibility or using the safe promise wrapper
                    records = await new Promise((resolve, reject) => {
                        resolver.resolve(domain, queryType, (err, addresses) => {
                            if (err) reject(err);
                            else resolve(addresses);
                        });
                    });
                }
                const duration = Date.now() - start;

                // Format results
                let formattedValue = '';
                if (Array.isArray(records)) {
                    if (queryType === 'MX') {
                        formattedValue = records.map(r => `${r.priority} ${r.exchange}`).join(', ');
                    } else if (queryType === 'TXT') {
                        formattedValue = records.map(r => Array.isArray(r) ? r.join('') : r).join('\n');
                    } else if (typeof records[0] === 'object') {
                        formattedValue = JSON.stringify(records);
                    } else {
                        formattedValue = records.join(', ');
                    }
                } else {
                    formattedValue = String(records);
                }

                return {
                    probeId: probe.id,
                    location: probe.location,
                    country: probe.country,
                    provider: probe.provider,
                    status: 'OK',
                    value: formattedValue,
                    time_ms: duration
                };

            } catch (err) {
                // Return failed status instead of throwing
                return {
                    probeId: probe.id,
                    location: probe.location,
                    country: probe.country,
                    provider: probe.provider,
                    status: 'Failed',
                    error: err.code || 'TIMEOUT',
                    time_ms: Date.now() - start
                };
            }
        });

        const results = await Promise.all(promises);
        const successCount = results.filter(r => r.status === 'OK').length;

        res.json({
            domain,
            type,
            results,
            successCount
        });

    } catch (err) {
        console.error("DNS Lookup Fatal Error:", err);
        res.status(500).json({ message: `Lookup failed: ${err.message}` });
    }
});

module.exports = router;
